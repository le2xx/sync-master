import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CompanyType } from '@libs/models/src/lib/types';

// TODO повторяется, нужно вынести в общие
interface UserRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

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
    try {
      return this.companyService.create(name, userId);
    } catch (error) {
      throw new Error('Error create company');
    }
  }
}
