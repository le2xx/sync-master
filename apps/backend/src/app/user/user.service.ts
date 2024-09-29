import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '@libs/models/src/lib/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>
  ) {}

  // Проверка, существует ли email в базе данных
  async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const { email, password } = createUserDto;

    // Проверяем, существует ли пользователь с таким email
    const emailExists = await this.isEmailTaken(email);
    if (emailExists) {
      throw new ConflictException('Email is already taken'); // Выбрасываем исключение
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }
}
