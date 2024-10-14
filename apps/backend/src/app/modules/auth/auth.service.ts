import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserAccess, User } from '@libs/models/src/lib/types';
import { convertKeysToCamelCase } from '../../utils';
import { Pool } from 'pg';

@Injectable()
export class AuthService {
  constructor(
    @Inject('PG_CONNECTION') private pool: Pool,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, password: string): Promise<UserAccess> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.createToken(user);
  }

  private async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private async createToken(user: any): Promise<UserAccess> {
    const payload = { email: user.email, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async findUserByEmail(email: string): Promise<User> {
    const client = await this.pool.connect();

    try {
      const result = await client.query(
        `SELECT * FROM public.users WHERE email = $1 AND is_deleted = false`,
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
}
