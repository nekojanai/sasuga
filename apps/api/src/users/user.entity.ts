import { IUser } from '@sasuga/api-interfaces';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Index, BeforeInsert, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UsernameTransformer } from './username.transformer';
import { PasswordTransformer } from './password.transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { StreamKeyTransformer } from './streamkey.transformer';
import * as crypto from 'crypto';
import { RemoteActor } from './remote-actor.entity';
import { Upload } from '../uploads/upload.entity';

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

  @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  @Column({ length: 256, transformer: new StreamKeyTransformer() })
  streamkey: string;

  @Column({ default: false })
  isStreaming: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column('varchar', {
		length: 4096,
	})
  pubkey: string;

  @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  @Column('varchar', {
		length: 4096,
  })
  privkey: string;

  @ManyToMany("RemoteActor")
  @JoinTable()
  followers: RemoteActor[];

  @OneToMany("Upload","owner")
  uploads: Upload[];

  @BeforeInsert()
  generateKeys() {
    const pair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });
    this.pubkey = pair.publicKey;
    this.privkey = pair.privateKey;
  }

}