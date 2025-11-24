import { Client } from '../api-client';
import {
  LoginReqDto,
  LoginResDto,
  LoginRequest,
  LoginResponse,
  PasswordChangeDto,
  PasswordChange,
} from '../validations/auth';

// 로그인 서비스
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const validatedData = LoginReqDto.parse(data);
  const response = await Client.post<LoginResponse, LoginRequest>('auth/login', validatedData);
  return LoginResDto.parse(response);
};

// 비밀번호 변경 서비스
export const passwordChange = async (data: PasswordChange): Promise<void> => {
  const validatedData = PasswordChangeDto.parse(data);
  await Client.put<void, PasswordChange>('auth/password', validatedData);
};
