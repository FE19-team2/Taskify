import { Client } from '@/lib/api/client/api-client';
import {
  LoginReqDto,
  LoginResDto,
  LoginRequest,
  LoginResponse,
  PasswordChangeDto,
  PasswordChange,
} from '../validations/auth';

// 로그인 서비스

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const validatedData = LoginReqDto.parse(data);
  const response = await Client.post<LoginResponse, LoginRequest>('/auth/login', validatedData);
  return LoginResDto.parse(response);
}

// 비밀번호 변경 서비스

export async function passwordChange(data: PasswordChange): Promise<void> {
  const validatedData = PasswordChangeDto.parse(data);
  await Client.put<void, PasswordChange>('auth/password', validatedData);
}
