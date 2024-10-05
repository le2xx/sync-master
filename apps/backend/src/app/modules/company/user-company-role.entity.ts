import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Company } from './company.entity';
import { Role } from '../roles/roles.entity';

@Entity('userCompanyRole')
export class UserCompanyRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.userCompanyRoles)
  user: User;

  @ManyToOne(() => Company, (company) => company.userCompanyRoles)
  company: Company;

  @ManyToOne(() => Role, (role) => role.userCompanyRoles)
  role: Role;
}
