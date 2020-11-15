export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  isAdmin: boolean;
  streamkey: string;
  isStreaming: boolean;
  isActive: boolean;
}

export interface ICreateUserDto {
  name: string;
  password: string;
  isAdmin?: boolean;
  isActive?: boolean;
}

export interface IUpdateUserDto {
  password?: string;
  isAdmin?: boolean;
  isActive? :boolean;
}

export interface IUpdatePasswordDto {
  password: string;
}

export interface IReplaceUserDto {
  name: string;
  password: string;
  isAdmin?: boolean;
  isActive?: boolean;
}