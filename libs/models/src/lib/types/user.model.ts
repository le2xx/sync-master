import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export type UserType = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
};

export class CreateUserDto implements Pick<UserType, 'email' | 'password'> {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

export type UserResponseDto = Pick<
  UserType,
  'userId' | 'email' | 'firstName' | 'lastName'
>;
