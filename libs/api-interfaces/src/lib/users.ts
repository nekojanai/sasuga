export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  isAdmin: boolean;
}

export interface ICreateUserDto {
  name: string;
  password: string;
  isAdmin?: boolean;
}

export interface IUpdateUserDto {
  password?: string;
  isAdmin?: boolean;
}

export interface IReplaceUserDto {
  name: string;
  password: string;
  isAdmin?: boolean;
}