import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Avatar } from '../avatars/avatar.entity';
import { Notification } from '../notifications/notification.entity';

enum UserRole {
  ADMIN = 'admin',
  PLAYER = 'player',
}

export enum UserRegistrationStatus {
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  DONE = 'DONE',
}

// When using an entity constructor its arguments must be optional. Since ORM creates
// instances of entity classes when loading from the database, therefore it is not
// aware of your constructor arguments;
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    type: 'enum',
    enum: UserRegistrationStatus,
    default: UserRegistrationStatus.PENDING_VERIFICATION,
  })
  registrationStatus: UserRegistrationStatus;

  @Column({
    type: 'varchar',
    length: 11,
    unique: true,
    nullable: true,
    default: null,
  })
  cellphone: string;

  @Column({ type: 'timestamptz', nullable: true, default: null }) // if null: not verified yet
  cellphoneVerifiedAt: Date;

  @Column({
    type: 'varchar',
    length: 80,
    unique: true,
    nullable: true,
    default: null,
  })
  email: string;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  emailVerifiedAt: Date;

  @Column({ type: 'varchar', length: 72, nullable: true, default: null })
  password: string;

  @Column({ type: 'varchar', length: 72, nullable: true, default: null })
  passwordResetToken: string;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  passwordResetExpires: Date;

  @Column({ type: 'varchar', length: 72, nullable: true, default: null })
  registrationToken: string;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  registrationTokenExpires: Date;

  @Column({ type: 'varchar', length: 40, nullable: true, default: null })
  nickname: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PLAYER })
  role: UserRole;

  @ManyToOne(type => Avatar, avatar => avatar.users)
  avatar: Avatar;

  @OneToMany(type => Notification, notification => notification.user)
  notifications: Notification[];

  @CreateDateColumn({ type: 'timestamptz' }) joinedAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt: Date;

  @VersionColumn() v: number;
}
