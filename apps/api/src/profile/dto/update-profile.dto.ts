import { IUpdateProfileDto, IUpload } from '@sasuga/api-interfaces';
import { IsObject, IsString } from 'class-validator';

export class UpdateProfileDto implements IUpdateProfileDto {
  @IsString()
  preferedName?: string;
  @IsString()
  summary?: string;
  @IsObject()
  icon?: IUpload;
  @IsObject()
  image?: IUpload;
}