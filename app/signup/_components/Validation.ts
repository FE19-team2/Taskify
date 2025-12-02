export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateNickname = (nickname: string): boolean => {
  if (!nickname || nickname.length === 0) {
    return '닉네임을 입력해주세요.';
  }

  const length = nickname.length;

  if (length < 2) {
    return '닉네임은 2자 이상 입력해주세요.';
  }

  if (length > 10) {
    return '닉네임은 10자 이하로 입력해주세요.';
  }

  return '';
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword && password.length > 0;
};
