import { Body, Controller, Post } from '@nestjs/common';
import { Role } from './roles.entity';
import { RolesService } from './roles.service';
import { CreateRoleDto } from '@libs/models/src/lib/types';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create')
  async create(@Body() createRole: CreateRoleDto): Promise<Role> {
    return await this.rolesService.create(createRole);
  }
}
