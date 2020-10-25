import { IUser } from '@sasuga/api-interfaces';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Index } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UsernameTransformer } from './username.transformer';
import { PasswordTransformer } from './password.transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { StreamKeyTransformer } from './streamkey.transformer';

@Entity("users")
export class User implements IUser {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Index()
  @Column({ length: 30, unique: true, transformer: new UsernameTransformer() })
  name: string;

  @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  @Column({ length: 256, transformer: new PasswordTransformer() })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ length: 256, transformer: new StreamKeyTransformer() })
  streamkey: string;

}