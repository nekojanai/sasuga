import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RemoteInstance } from './remote-instance.entity';

@Entity()
export class RemoteActor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Index()
  @Column({ length: 30, unique: true })
  name: string;

  @Column({ type: "json" })
  actorObject: any;

  @ManyToOne('RemoteInstance','actors')
  instance: RemoteInstance;
}