import { Inject, Injectable } from '@nestjs/common';
import { Company } from '@libs/models/src/lib/types';
import { Pool } from 'pg';
import { convertKeysToCamelCase } from '../../utils';
import { UserRole } from '@libs/models/src/lib/enums';

@Injectable()
export class CompanyService {
  constructor(@Inject('PG_CONNECTION') private pool: Pool) {}

  async create(name: string, currentUserId: string): Promise<Company> {
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');

      // Создаём компанию и возвращаем её ID
      const companyResult = await client.query(
        `INSERT INTO public.companies (name)
       VALUES ($1)
       RETURNING *`, // Возвращаем всю информацию о компании
        [name]
      );

      const newCompany = companyResult.rows[0]; // Сохраняем данные компании

      // Получаем роль Owner
      const roleResult = await client.query(
        `SELECT role_id FROM public.roles WHERE role_id = ${UserRole.owner}`
      );
      const ownerRoleId = roleResult.rows[0].role_id;

      // Назначаем текущему пользователю роль Owner в этой компании
      await client.query(
        `INSERT INTO public.user_company_roles (user_id, company_id, role_id)
       VALUES ($1, $2, $3)`,
        [currentUserId, newCompany.company_id, ownerRoleId]
      );

      await client.query('COMMIT');

      return convertKeysToCamelCase(newCompany);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async getMyCompanies(userId: string): Promise<Company[]> {
    const client = await this.pool.connect();

    try {
      const result = await client.query(
        `SELECT c.*
         FROM public.companies c
         JOIN public.user_company_roles ucr ON ucr.company_id = c.company_id -- Измените на правильный столбец
         WHERE ucr.user_id = $1`,
        [userId]
      );

      return result.rows; // Здесь возвращаем массив компаний
    } finally {
      client.release();
    }
  }
}
