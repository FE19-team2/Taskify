import { Client } from '../api-client';
import {
  LoginReqDto,
  LoginResDto,
  LoginRequest,
  LoginResponse,
  PasswordChangeDto,
  PasswordChange,
} from '../validations/auth';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const validatedData = LoginReqDto.parse(data);
  const response = await Client.post<LoginResponse, LoginRequest>('auth/login', validatedData);
  return LoginResDto.parse(response);
};

export const passwordChange = async (data: PasswordChange): Promise<void> => {
  const validatedData = PasswordChangeDto.parse(data);
  await Client.put<void, PasswordChange>('auth/password', validatedData);
};
