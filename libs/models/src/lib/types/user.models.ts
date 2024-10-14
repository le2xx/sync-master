export type User = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  registerAt: Date;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
};

export class CreateUserDto implements Pick<User, 'email' | 'password'> {
  email: string;
  password: string;
}

export type UserResponseDto = Omit<User, 'password' | 'isActive' | 'isDeleted'>;

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
