import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RemoteActor } from './remote-actor.entity';

@Entity()
export class RemoteInstance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Index()
  @Column({ length: 30, unique: true })
  domain: string;

  @OneToMany('RemoteActor','instance')
  actors: RemoteActor[];
}