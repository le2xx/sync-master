import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto, UserType } from '@libs/models/src/lib/types';
import { Users } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<UserType>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserType> {
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
      registerAt: new Date().toISOString(),
    });

    return this.userRepository.save(user);
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }

  async findByEmail(email: string): Promise<UserType> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(userId: string): Promise<UserType> {
    return this.userRepository.findOne({ where: { userId } });
  }
}
