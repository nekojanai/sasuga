import { IReplaceUserDto } from '@sasuga/api-interfaces';
import { IsNotEmpty } from 'class-validator';

export class ReplaceUserDto implements IReplaceUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
  isAdmin?: boolean;
}