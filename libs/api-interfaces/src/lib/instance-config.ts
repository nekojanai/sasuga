export interface IInstanceConfig {
  createdAt: Date;
  updatedAt: Date;
  registrationsEnabled: boolean;
  instanceName: string;
}

export interface IUpdateInstanceConfigDto {
  registrationsEnabled?: boolean;
  instanceName?: string;
}