import { IRegisterDto } from '@sasuga/api-interfaces';
import { IsNotEmpty } from 'class-validator';

export class RegisterDto implements IRegisterDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
}