import { IUpdatePasswordDto } from '@sasuga/api-interfaces';
import { IsString } from 'class-validator';

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @IsString()
  password: string;
}