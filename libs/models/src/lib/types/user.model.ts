export type UserType = {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
};

export type CreateUserDto = Pick<UserType, 'email' | 'password'>;
