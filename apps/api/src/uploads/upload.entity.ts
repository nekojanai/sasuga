import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from '../users/user.entity';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({})
  filename: string;

  @Column({})
  originalfilename: string;

  @Column({})
  mimetype: string;

  @Column({})
  size: number;

  @ManyToOne('User','uploads')
  owner: User;
}