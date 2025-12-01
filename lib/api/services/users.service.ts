import { UserSchema } from '../validations/auth';
import { Client } from '../client/api-client';
import {
  User,
  updateProfileResDto,
  UpdateProfileRequest,
  UpdateProfileResponse,
  updateProfileReqDto,
} from '../validations/users';

export async function getUserProfile(): Promise<User> {
  const res = await Client.get<User>('/users/me');
  return UserSchema.parse(res);
}

export async function updateUserProfile(
  profileData: UpdateProfileRequest,
): Promise<UpdateProfileResponse> {
  const validatedData = updateProfileReqDto.parse(profileData);
  const res = await Client.put<UpdateProfileResponse, UpdateProfileRequest>(
    '/users/me',
    validatedData,
  );
  return updateProfileResDto.parse(res);
}
