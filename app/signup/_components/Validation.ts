export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateNickname = (nickname: string): string => {
  if (!nickname || nickname.length === 0) {
    return '닉네임을 입력해주세요.';
  }

  if (nickname.length < 2) {
    return '닉네임은 2자 이상 입력해주세요.';
  }

  const koreanCount = (nickname.match(/[가-힣]/g) || []).length;
  const otherCount = nickname.length - koreanCount;

  if (koreanCount > 8 || otherCount > 16) {
    return '닉네임은 한글 최대 8자, 영문 최대 16자입니다.';
  }

  return '';
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword && password.length > 0;
};
