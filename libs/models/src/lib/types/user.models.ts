import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export type UserType = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  registerAt: Date;
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

export type UserResponseDto = Omit<
  UserType,
  'password' | 'isActive' | 'isDeleted'
>;

export type UserRegistry = {
  email: string;
  password: string;
};

export type UserAccess = {
  accessToken: string;
};

export interface UserRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}
