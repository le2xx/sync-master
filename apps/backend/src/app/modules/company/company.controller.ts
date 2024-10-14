import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Company, UserRequest } from '@libs/models/src/lib/types';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCompany(
    @Body('name') name: string,
    @Req() req: UserRequest
  ): Promise<Company> {
    const userId = req.user.userId;
    return this.companyService.create(name, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyCompanies(@Req() req: UserRequest): Promise<Company[]> {
    const userId = req.user.userId; // Получаем userId из запроса
    return this.companyService.getMyCompanies(userId);
  }
}
