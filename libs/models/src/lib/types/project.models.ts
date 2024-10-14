import { IsOptional, IsString } from 'class-validator';

export type Project = {
  projectId: string;
  name: string;
  description: string;
};

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  companyId: string;

  @IsOptional()
  @IsString()
  description?: string;
}
