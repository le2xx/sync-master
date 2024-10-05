import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column()
  name: string;
}
