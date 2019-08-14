import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  ManyToOne,
} from 'typeorm';
import { Avatar } from './avatar.entity';

enum UserRole {
  ADMIN = 'admin',
  PLAYER = 'player',
}

enum RegistrationStatus {
  VERIFICATION_PENDING = 'VERIFICATION_PENDING',
}

// When using an entity constructor its arguments must be optional. Since ORM creates
// instances of entity classes when loading from the database, therefore it is not
// aware of your constructor arguments;
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ type: 'varchar', length: 11, unique: true })
  cellphone: string;
  @Column({ type: 'date', nullable: true }) // if null: not verified yet
  cellphoneVerifiedAt: Date;

  @Column({ type: 'varchar', length: 80, nullable: true, unique: true })
  email: string;
  @Column({ type: 'date', nullable: true })
  emailVerifiedAt: Date;

  @Column({ type: 'varchar', length: 72 })
  password: string;
  @Column({ type: 'varchar', length: 72, nullable: true })
  passwordResetToken: string;
  @Column({ type: 'date', nullable: true })
  passwordResetExpires: Date;

  @Column({ type: 'varchar', length: 72, nullable: true })
  registrationCode: string;
  @Column({ type: 'date', nullable: true })
  registrationCodeExpires: Date;

  @Column({ type: 'varchar', length: 40, nullable: true })
  nickname: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PLAYER })
  role: UserRole;

  @ManyToOne(type => Avatar, avatar => avatar.users)
  avatar: Avatar;

  @CreateDateColumn() joinedAt: Date;

  @UpdateDateColumn() updatedAt: Date;

  @VersionColumn() v: number;
}
