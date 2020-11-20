import { IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  preferedName?: string;
  @IsString()
  summary?: string;
}