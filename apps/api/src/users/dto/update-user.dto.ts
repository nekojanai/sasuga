import { IUpdateUserDto } from '@sasuga/api-interfaces';

export class UpdateUserDto implements IUpdateUserDto {
  password?: string;
  isAdmin?: boolean;
}