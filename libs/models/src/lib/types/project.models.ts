export type Project = {
  projectId: string;
  name: string;
  description: string;
};

export class CreateProjectDto {
  name: string;
  companyId: string;
  description?: string;
}
