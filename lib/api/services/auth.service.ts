import { Client } from '../api-client';
import { LoginReqDto, LoginResDto, LoginRequest, LoginResponse } from '../validations/auth';

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const validatedData = LoginReqDto.parse(data);
  const response = await Client.post<LoginResponse, LoginRequest>('auth/login', validatedData);
  return LoginResDto.parse(response);
};
