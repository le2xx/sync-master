import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '@libs/models/src/lib/types';

@Entity()
export class Users implements UserType {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  email: string;

  @Column({ default: null })
  firstName: string;

  @Column({ default: null })
  lastName: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;
}
