import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { UserCompanyRole } from './user-company-role.entity';
import { User } from '../user/user.entity';
import { Role } from '../roles/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Role, User, UserCompanyRole])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
