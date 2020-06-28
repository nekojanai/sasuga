export interface IInstanceConfig {
  createdAt: Date;
  updatedAt: Date;
  registrationsEnabled: boolean;
}

export interface IUpdateInstanceConfigDto {
  registrationsEnabled?: boolean;
}