import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UserResponseDto,
  UserType,
} from '@libs/models/src/lib/types';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

interface UserRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto
  ): Promise<UserResponseDto> {
    try {
      const savedUser = await this.userService.create(createUserDto);
      return this.mapToUserResponseDto(savedUser);
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: UserRequest): Promise<UserResponseDto> {
    const userId = req.user.userId; // Доступ к userId из JWT
    try {
      const foundUser = await this.userService.findById(userId);
      return this.mapToUserResponseDto(foundUser);
    } catch (error) {
      throw new Error('Error finding user');
    }
  }

  private mapToUserResponseDto(user: UserType): UserResponseDto {
    return {
      userId: user.userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      registerAt: user.registerAt,
    };
  }
}
