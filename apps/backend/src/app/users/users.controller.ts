import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Маршрут для создания пользователя
  @Post()
  async create(@Body() body: { username: string; password: string }) {
    return this.usersService.createUser(body.username, body.password);
  }

  // Маршрут для удаления пользователя по ID
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.usersService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
