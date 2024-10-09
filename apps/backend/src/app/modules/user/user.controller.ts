import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserResponseDto } from '@libs/models/src/lib/types';
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
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: UserRequest): Promise<UserResponseDto> {
    const userId = req.user.userId; // Доступ к userId из JWT
    try {
      return await this.userService.findById(userId);
    } catch (error) {
      throw new Error('Error finding user');
    }
  }
}
