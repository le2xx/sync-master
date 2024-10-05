import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../user/user.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  organizationId: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => Users, (user) => user.organizations)
  @JoinTable({
    name: 'userOrganizationRoles',
    joinColumn: {
      name: 'organizationId',
      referencedColumnName: 'organizationId',
    },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'userId' },
  })
  users: Users[];
}
