import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserCompanyRole } from '../company/user-company-role.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column()
  name: string;

  @OneToMany(() => UserCompanyRole, (userOrgRole) => userOrgRole.user)
  userCompanyRoles: UserCompanyRole[];
}
