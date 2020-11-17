import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';
import { MinioModule } from 'nestjs-minio-client';
import { UploadsService } from './uploads.service';
import { environment } from '../environments/environment';

@Module({
  imports: [
    TypeOrmModule.forFeature([Upload]),
    MinioModule.register({
      endPoint: environment.S3_ENDPOINT,
      port: environment.S3_PORT,
      useSSL: environment.S3_USESSL,
      accessKey: environment.S3_ACCESSKEY,
      secretKey: environment.S3_SECRETKEY
    })
  ],
  exports: [
    UploadsService
  ],
  providers: [
    UploadsService
  ]
})
export class UploadsModule {}
