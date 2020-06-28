import { IUser } from './users';

export interface ILoginDto {
  name: string;
  password: string;
}

export interface ILoginResponseDto {
  token: string;
}

export interface IRegisterDto {
  name: string;
  password: string;
}

export interface IRegisterResponseDto extends IUser {
  token: string;
}