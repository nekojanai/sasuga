import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from '@sasuga/api-interfaces';
import { MinioService } from 'nestjs-minio-client';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IUpload } from './upload';
import { Upload } from './upload.entity';

@Injectable()
export class UploadsService {

  constructor(
    @InjectRepository(Upload)
    public uploadRepo: Repository<Upload>,
    private minioService: MinioService
  ) {}

  upload(files: IUpload[], user: IUser) {
    const policy1 = {"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":["*"]},"Action":["s3:GetBucketLocation","s3:ListBucket","s3:ListBucketMultipartUploads"],"Resource":[`arn:aws:s3:::${user.name}`]},{"Effect":"Allow","Principal":{"AWS":["*"]},"Action":["s3:GetObject","s3:ListMultipartUploadParts","s3:PutObject","s3:AbortMultipartUpload","s3:DeleteObject"],"Resource":[`arn:aws:s3:::${user.name}/*`]}]};
    return this.minioService.client.bucketExists(user.name)
    .then(exists => {
      if (exists) {
        return this.uploadFiles(files, user);
      } else {
        return this.minioService.client.makeBucket(user.name, 'us-east-1')
        .then(() => this.minioService.client.setBucketPolicy(user.name, JSON.stringify(policy1)))
        .then(() => this.uploadFiles(files, user));
      }
    });
  }

  remove(objectList: string[], user: IUser) {
    return this.minioService.client.removeObjects(user?.name, objectList);
  }

  private async uploadFiles(files: IUpload[], user: IUser) {
    const uploadedFiles: Upload[] = [];
    for (const file of files) {
      const uuid = uuidv4();
      const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      const metadata = {
        originalname: file.originalname,
        "Content-Type": file.mimetype,
        size: file.size
      };
      const filename = `${uuid}${ext}`;
      await this.minioService.client.putObject(user.name, filename, file.buffer, metadata);
      const fileEntity = this.uploadRepo.create({
        filename,
        originalfilename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        owner: user
      });
      const saved = await this.uploadRepo.save(fileEntity);
      uploadedFiles.push(saved);
    }
    return uploadedFiles;
  }
}