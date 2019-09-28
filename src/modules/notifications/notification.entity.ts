import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
class Notification extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'varchar' })
  channel: string;

  @Column({ type: 'varchar' })
  purpose: string;

  @Column({ type: 'varchar' })
  provider: string;

  // message string
  @Column({ type: 'text', nullable: true, default: null })
  text: string;

  // JSON stringified response
  @Column({ type: 'text', nullable: true, default: null })
  response: string;

  @Column({ type: 'varchar' })
  to: string; // email address or a phone number

  @Column({ type: 'varchar', nullable: true, default: null })
  providerGeneratedId: string;

  // success | error
  @Column({ type: 'varchar', nullable: true, default: null })
  status: string;

  @ManyToOne(type => User, user => user.notifications)
  user: User;

  @CreateDateColumn({ type: 'timestamptz' }) sentAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt: Date;
}

export { Notification };
