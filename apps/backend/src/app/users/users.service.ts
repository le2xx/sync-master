import { Delete, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  private readonly users: User[] = [
    {
      id: 1,
      email: 'john',
      password: 'changeme',
      isActive: true,
    },
    {
      id: 2,
      email: 'chris',
      password: 'secret',
      isActive: true,
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async createUser(user: { email: string; password: string }): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const newUser = {
      id: Date.now(),
      email: user.email,
      password: hashedPassword,
      isActive: true,
    };
    this.users.push(newUser);
    return newUser;
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
