import { ILoginDto } from '@sasuga/api-interfaces';
import { IsNotEmpty } from 'class-validator';

export class LoginDto implements ILoginDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
}