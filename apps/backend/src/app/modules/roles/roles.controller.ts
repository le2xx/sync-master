import { Body, Controller, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, RoleType } from '@libs/models/src/lib/types';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create')
  async create(@Body() createRole: CreateRoleDto): Promise<RoleType> {
    return await this.rolesService.create(createRole);
  }
}
