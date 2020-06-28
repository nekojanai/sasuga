import { ICreateUserDto } from '@sasuga/api-interfaces';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
  isAdmin?: boolean;
}