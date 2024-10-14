import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateProjectDto, Project } from '@libs/models/src/lib/types';
import { convertKeysToCamelCase } from '../../utils';
import { UserRole } from '@libs/models/src/lib/enums';

@Injectable()
export class ProjectService {
  constructor(@Inject('PG_CONNECTION') private pool: Pool) {}

  async create(
    createProject: CreateProjectDto,
    currentUserId: string
  ): Promise<Project> {
    const { name, description, companyId } = createProject;
    const client = await this.pool.connect();

    try {
      // Начинаем транзакцию
      await client.query('BEGIN');

      // Проверяем, является ли пользователь владельцем компании
      const ownerCheckResult = await client.query(
        `SELECT 1 FROM public.user_company_roles
         WHERE user_id = $1 AND company_id = $2 AND role_id = $3`,
        [currentUserId, companyId, UserRole.owner]
      );

      if (ownerCheckResult.rowCount === 0) {
        // Логируем, если пользователь не владелец
        throw new ForbiddenException('You are not the owner of this company.');
      }

      // Создаём проект и привязываем его к компании
      const projectResult = await client.query(
        `INSERT INTO public.projects (name, description, company_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
        [name, description, companyId]
      );
      const newProject = projectResult.rows[0];

      // Завершаем транзакцию
      await client.query('COMMIT');

      // Возвращаем созданный проект
      return convertKeysToCamelCase(newProject);
    } catch (error) {
      // Откатываем транзакцию
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async getMyProjects(userId: string): Promise<Project[]> {
    const client = await this.pool.connect();

    try {
      const result = await client.query(
        `SELECT p.*
         FROM public.projects p
         JOIN public.user_company_roles ucr ON ucr.company_id = p.company_id
         WHERE ucr.user_id = $1`,
        [userId]
      );

      return result.rows; // Возвращаем массив проектов
    } finally {
      client.release();
    }
  }
}
