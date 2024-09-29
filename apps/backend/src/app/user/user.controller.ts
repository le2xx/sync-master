import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserResponseDto } from '@libs/models/src/lib/types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const savedUser = await this.userService.create(createUserDto);
    const userResponse: UserResponseDto = {
      userId: savedUser.userId,
      email: savedUser.email,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
    };

    return userResponse;
  }
}
