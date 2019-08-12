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
  ADMIN = 'admin',
  PLAYER = 'player',
}

// When using an entity constructor its arguments must be optional. Since ORM creates
// instances of entity classes when loading from the database, therefore it is not
// aware of your constructor arguments;
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    type: 'varchar',
    length: 11,
    unique: true,
  })
  cellphone: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 72 })
  password: string;

  @Column({ type: 'varchar', length: 40 })
  nickname: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PLAYER })
  role: UserRole;

  @CreateDateColumn() joinedAt: Date;

  @UpdateDateColumn() updatedAt: Date;

  @VersionColumn() v: number;
}
