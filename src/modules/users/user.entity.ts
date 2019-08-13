import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

enum UserRole {
  ADMIN = 'ADMIN',
  PLAYER = 'PLAYER',
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

  @Column({ type: 'varchar', length: 80, nullable: true })
  email: string;
  @Column({ type: 'date', nullable: true })
  emailVerifiedAt: Date;

  @Column({ type: 'varchar', length: 72 })
  password: string;
  @Column({ type: 'string', nullable: true })
  passwordResetToken: string;
  @Column({ type: 'date', nullable: true })
  passwordResetExpires: Date;

  @Column({ type: 'string', nullable: true })
  registrationToken: string;
  @Column({ type: 'date', nullable: true })
  registrationTokenExpires: Date;

  @Column({ type: 'varchar', length: 40 })
  nickname: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PLAYER })
  role: UserRole;

  // avatarId:

  @CreateDateColumn() joinedAt: Date;

  @UpdateDateColumn() updatedAt: Date;

  @VersionColumn() v: number;
}
