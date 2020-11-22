import { IUpdateProfileDto, IUpload } from '@sasuga/api-interfaces';
import { IsBoolean, IsObject, IsString } from 'class-validator';

export class UpdateProfileDto implements IUpdateProfileDto {
  @IsString()
  preferedName?: string;
  @IsString()
  summary?: string;
  @IsObject()
  icon?: IUpload;
  @IsObject()
  image?: IUpload;
  @IsBoolean()
  allowGuestsInChat?: boolean;
  @IsString()
  hexColor?: string;
}