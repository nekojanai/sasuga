import { IRegisterResponseDto, IUpload } from '@sasuga/api-interfaces';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class RegisterResponseDto implements IRegisterResponseDto {

  constructor(data: Partial<RegisterResponseDto>) {
    Object.assign(this, data);
  }

  token: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  isAdmin: boolean;
  @ApiHideProperty()
  @Exclude()
  password: string;
  streamkey: string;
  isStreaming: boolean;
  isActive: boolean;
  allowGuestsInChat: boolean;
  hexColor: string;
  pubkey: string;
  icon: IUpload;
  image: IUpload;
  preferedName: string;
  summary: string;
  @ApiHideProperty()
  @Exclude()
  privkey: string;
}