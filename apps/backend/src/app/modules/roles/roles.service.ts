import { Injectable } from '@nestjs/common';
import { CreateRoleDto, RoleType } from '@libs/models/src/lib/types';

@Injectable()
export class RolesService {
  constructor() {}

  async create(createRole: CreateRoleDto): Promise<RoleType> {
    return {} as RoleType;
  }
}
