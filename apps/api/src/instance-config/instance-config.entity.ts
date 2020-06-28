import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";
import { IInstanceConfig } from '@sasuga/api-interfaces';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class InstanceConfig implements IInstanceConfig {

  @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  @PrimaryColumn({ default: true })
  unique: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  registrationsEnabled: boolean;

}