import type { User } from '@/types/user.ts';

export type StandartResponse = {
  success: boolean;
  message: string;
};

export type RegisterUserResponse = {
  success: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type RegisterUserPayload = {
  email: string;
  password: string;
  name: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type ResetPasswordPayload = {
  email: string;
};

export type ConfirmResetPasswordPayload = {
  password: string;
  token: string | null;
};
