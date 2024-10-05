import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organizations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
})
export class OrganizationsModule {}
