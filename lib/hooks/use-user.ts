// src/hooks/use-user.ts (가정)
import { useState, useEffect } from 'react';
import { User } from '../api/validations/users';
import { getUserProfile } from '../api/services/users.service';

interface UseUserHook {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

const useUser = (): UseUserHook => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('사용자 정보 로드 실패'));
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, isLoading, error };
};

export default useUser;
