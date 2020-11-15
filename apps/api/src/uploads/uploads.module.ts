import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadsService } from './uploads.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Upload]),
    MinioModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return ({
          endPoint: configService.get('S3_ENDPOINT'),
          port: 9000,
          useSSL: false,
          accessKey: configService.get('S3_ACCESSKEY'),
          secretKey: configService.get('S3_SECRETKEY')
        });
      },
      inject: [ConfigService]
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
