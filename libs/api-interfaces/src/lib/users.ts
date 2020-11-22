import { IUpload } from './uploads';

export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  preferedName: string;
  summary: string;
  isAdmin: boolean;
  streamkey: string;
  isStreaming: boolean;
  isActive: boolean;
  pubkey: string;
  privkey: string;
  password: string;
  icon: IUpload;
  image: IUpload;
  allowGuestsInChat: boolean;
  hexColor: string;
}

export interface ICreateUserDto {
  name: string;
  password: string;
  preferedName?: string;
  summary?: string;
  isAdmin?: boolean;
  isActive?: boolean;
  allowGuestsInChat?: boolean;
  hexColor?: string;
}

export interface IUpdateUserDto {
  password?: string;
  isAdmin?: boolean;
  isActive? :boolean;
  preferedName?: string;
  summary?: string;
  allowGuestsInChat?: boolean;
  hexColor?: string;
}

export interface IReplaceUserDto {
  name: string;
  password: string;
  isAdmin?: boolean;
  isActive?: boolean;
  preferedName?: string;
  summary?: string;
  allowGuestsInChat?: boolean;
  hexColor?: string;
}