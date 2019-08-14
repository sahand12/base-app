import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Avatar extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'varchar', unique: true })
  src: string;

  @Column({ type: 'varchar', length: 80 })
  name: string;

  @OneToMany(type => User, user => user.avatar)
  users: User[];

  @CreateDateColumn() createdAt: Date;

  @UpdateDateColumn() updatedAt: Date;

  @VersionColumn() v: number;
}
