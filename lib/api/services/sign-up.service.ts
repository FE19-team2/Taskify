import { Client } from '../client/api-client';
import { signUpReqDto, signUpResDto, SignUpRequest, SignUpResponse } from '../validations/sign-up';

export async function signUp(data: SignUpRequest): Promise<SignUpResponse> {
  const validated = signUpReqDto.parse(data);
  const res = await Client.post<SignUpResponse, SignUpRequest>('/users', validated);
  return signUpResDto.parse(res);
}
