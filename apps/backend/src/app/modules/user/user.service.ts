import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, UserResponseDto } from '@libs/models/src/lib/types';
import { Pool } from 'pg';
import { convertKeysToCamelCase } from '../../utils';

@Injectable()
export class UserService {
  constructor(@Inject('PG_CONNECTION') private pool: Pool) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { email, password } = createUserDto;

    // Проверяем, существует ли пользователь с таким email
    const emailExists = await this.isEmailTaken(email);
    if (emailExists) {
      throw new NotFoundException('Email is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await this.pool.connect();

    try {
      const result = await client.query(
        `INSERT INTO public.users (email, password)
            VALUES ($1, $2)
            RETURNING user_id, email, first_name, last_name, register_at`,
        [email, hashedPassword]
      );
      return convertKeysToCamelCase(result.rows[0]);
    } finally {
      client.release();
    }
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        'SELECT 1 FROM public.users WHERE email = $1 LIMIT 1',
        [email]
      );
      return result.rowCount > 0;
    } finally {
      client.release();
    }
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    const client = await this.pool.connect();

    try {
      const result = await client.query(
        'SELECT user_id, email, first_name, last_name, register_at FROM public.users WHERE email = $1 AND is_deleted = false',
        [email]
      );

      if (result.rows.length === 0) {
        throw new NotFoundException(`User with email ${email} not found.`);
      }

      return convertKeysToCamelCase(result.rows[0]);
    } finally {
      client.release();
    }
  }

  async findById(userId: string): Promise<UserResponseDto> {
    const client = await this.pool.connect();

    try {
      const result = await client.query(
        'SELECT user_id, email, first_name, last_name, register_at FROM public.users WHERE user_id = $1 AND is_deleted = false',
        [userId]
      );

      if (result.rows.length === 0) {
        throw new NotFoundException(`User with userId ${userId} not found.`);
      }

      return convertKeysToCamelCase(result.rows[0]);
    } finally {
      client.release();
    }
  }
}
