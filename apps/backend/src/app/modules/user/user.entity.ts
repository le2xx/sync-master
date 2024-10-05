import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserCompanyRole } from '../company/user-company-role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: null })
  firstName: string;

  @Column({ default: null })
  lastName: string;

  @Column({ default: null })
  registerAt: Date;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => UserCompanyRole, (userOrgRole) => userOrgRole.user)
  userCompanyRoles: UserCompanyRole[];
}
