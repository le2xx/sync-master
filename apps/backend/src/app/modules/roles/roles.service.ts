import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';
import { CreateRoleDto } from '@libs/models/src/lib/types';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}

  async create(createRole: CreateRoleDto): Promise<Role> {
    const emailExists = await this.isRoleNameTaken(createRole.name);
    if (emailExists) {
      throw new ConflictException('Role name is already taken');
    }

    const role = this.roleRepository.create(createRole);
    return this.roleRepository.save(role);
  }

  async isRoleNameTaken(name: string): Promise<boolean> {
    const role = await this.roleRepository.findOne({ where: { name } });
    return !!role;
  }

  async findByName(name: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { name } });
  }
}
