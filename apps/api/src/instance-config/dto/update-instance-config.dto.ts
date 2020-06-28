import { IUpdateInstanceConfigDto } from '@sasuga/api-interfaces';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateInstanceConfigDto implements IUpdateInstanceConfigDto {
  @IsBoolean()
  @IsOptional()
  registrationsEnabled?: boolean;
}