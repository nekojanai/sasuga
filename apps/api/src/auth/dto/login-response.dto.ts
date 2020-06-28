import { ILoginResponseDto } from '@sasuga/api-interfaces';

export class LoginResponseDto implements ILoginResponseDto {
  token: string;
}