import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from '@sasuga/api-interfaces';
import { MinioService } from 'nestjs-minio-client';
import { Stream } from 'stream';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IUpload } from './upload';
import { Upload } from './upload.entity';

@Injectable()
export class UploadsService {

  private bucketExists;
  private makeBucket;
  private putObject;
  private setBucketPolicy;
  private removeObjects;

  constructor(
    @InjectRepository(Upload)
    public uploadRepo: Repository<Upload>,
    private minioService: MinioService
  ) {
    this.bucketExists = (bucket: string): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        this.minioService.client.bucketExists(bucket, (err, exists) => {
          if (err) { return reject(err) }
          resolve(exists);
        });
      });
    };
    this.makeBucket = (bucket: string, region: string = 'us-east-1'): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        this.minioService.client.makeBucket(bucket, region, (err) => {
          if (err) { return reject(err) }
          resolve(true);
        });
      });
    };
    this.putObject = (bucket: string, objectName: string, stream: Stream, metaData: Object): Promise<string> => {
      return new Promise((resolve, reject) => {
        this.minioService.client.putObject(bucket, objectName, stream, metaData, (err, etag) => {
          if (err) { return reject(err) }
          resolve(etag);
        });
      });
    };
    this.setBucketPolicy = (bucket: string, policy: string): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        this.minioService.client.setBucketPolicy(bucket, policy, (err) => {
          if (err) { return reject(err) }
          resolve(true);
        });
      });
    }
    this.removeObjects = (bucket: string, objectList: string[]): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        this.minioService.client.removeObjects(bucket, objectList, (err) => {
          if (err) { return reject(err) }
          resolve(true);
        });
      });
    }
  }

  upload(files: IUpload[], user: IUser) {
    return this.createBucketIfNotExists(files, user);
  }

  remove(objectList: string[], user: IUser) {
    return this.removeObjects(user?.name, objectList);
  }

  private createBucketIfNotExists(files: IUpload[], user: IUser, region: string = 'us-east-1') {
    
    const policy = {"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":["*"]},"Action":["s3:GetBucketLocation","s3:ListBucket","s3:ListBucketMultipartUploads"],"Resource":[`arn:aws:s3:::${user.name}/*`]},{"Effect":"Allow","Principal":{"AWS":["*"]},"Action":["s3:GetObject","s3:ListMultipartUploadParts","s3:PutObject","s3:AbortMultipartUpload","s3:DeleteObject"],"Resource":[`arn:aws:s3:::${user.name}/*`]}]};
    
    return this.bucketExists(user.name)
    .then(exists => {
      if (exists) {
        return this.uploadFiles(files, user);
      } else {
        return this.makeBucket(user.name, region)
        .then(() => this.setBucketPolicy(user.name, JSON.stringify(policy)))
        .then(() => this.uploadFiles(files, user));
      }
    });
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
      await this.putObject(user.name, filename, file.buffer, metadata);
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