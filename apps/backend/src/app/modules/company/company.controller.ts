import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CompanyType, UserRequest } from '@libs/models/src/lib/types';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCompany(
    @Body('name') name: string,
    @Req() req: UserRequest
  ): Promise<CompanyType> {
    const userId = req.user.userId;
    return this.companyService.create(name, userId);
  }
}
