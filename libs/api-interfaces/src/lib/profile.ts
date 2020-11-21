import { IUpload } from './uploads';

export interface IUpdateProfileDto {
  preferedName?: string;
  summary?: string;
  icon?: IUpload;
  image?: IUpload;
}

export interface IUpdatePasswordDto {
  password: string;
}