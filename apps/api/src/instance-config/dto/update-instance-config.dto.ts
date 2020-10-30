import { IUpdateInstanceConfigDto } from '@sasuga/api-interfaces';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateInstanceConfigDto implements IUpdateInstanceConfigDto {
  @IsBoolean()
  @IsOptional()
  registrationsEnabled?: boolean;

  @IsString()
  @IsOptional()
  instanceName?: string;
}