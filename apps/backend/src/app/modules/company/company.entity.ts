import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserCompanyRole } from './user-company-role.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  companyId: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => UserCompanyRole, (userOrgRole) => userOrgRole.user)
  userCompanyRoles: UserCompanyRole[];
}
