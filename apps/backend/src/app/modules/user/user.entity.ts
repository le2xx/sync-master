import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Organization } from '../organizations/organizations.entity';
import { Role } from '../roles/roles.entity';

@Entity('users')
export class Users {
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

  @ManyToMany(() => Organization, (organization) => organization.users)
  organizations: Organization[];

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'userOrganizationRoles',
    joinColumn: { name: 'userId', referencedColumnName: 'userId' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'roleId' },
  })
  roles: Role[];
}
