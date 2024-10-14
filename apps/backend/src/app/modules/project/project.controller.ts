import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import {
  Project,
  CreateProjectDto,
  UserRequest,
} from '@libs/models/src/lib/types';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProject(
    @Body() createProject: CreateProjectDto,
    @Req() req: UserRequest
  ): Promise<Project> {
    const userId = req.user.userId;
    return await this.projectService.create(createProject, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyProjects(@Req() req: UserRequest): Promise<Project[]> {
    const userId = req.user.userId;
    return this.projectService.getMyProjects(userId);
  }
}
