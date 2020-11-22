import { IUpload } from './uploads';

export interface IUpdateProfileDto {
  preferedName?: string;
  summary?: string;
  icon?: IUpload;
  image?: IUpload;
  allowGuestsInChat?: boolean;
  hexColor?: string;
}

export interface IUpdatePasswordDto {
  password: string;
}