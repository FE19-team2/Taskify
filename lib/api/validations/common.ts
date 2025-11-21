import { z } from 'zod';

export const EmailSchema = z.email({
  message: '유효한 이메일 형식이 아닙니다',
});

export const NicknameSchema = z
  .string()
  .trim()
  .min(2, { message: '닉네임은 2자 이상' })
  .max(20, { message: '닉네임은 20자 이하' });

export const PasswordSchema = z.string().min(8, {
  message: '비밀번호는 최소 8자 이상이어야 합니다',
});

export const ISODateString = z.string().refine((date) => !isNaN(Date.parse(date)), {
  message: '유효한 날짜 형식이 아닙니다 (예: 2024-11-21T10:00:00Z)',
});

export const HexColorSchema = z.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, {
  message: '유효한 16진수 색상 코드가 아닙니다 (예: #FFFFFF)',
});

export const InviteAcceptedTrue = z.literal(true, {
  message: 'inviteAccepted 는 true 여야 합니다',
});
export const TitleSchema = z
  .string()
  .min(1, {
    message: '제목은 비어 있을 수 없습니다',
  })
  .max(20, {
    message: '제목은 최대 20자까지 입력할 수 있습니다',
  });

export const Id = z.number().int().positive({
  message: 'ID는 양의 정수여야 합니다',
});

export const OptionalUrl = z.union([
  z.url({ message: '유효한 URL이 아닙니다' }),
  z.literal(''),
  z.undefined(),
]);

export const TagSchema = z.array(z.string().min(1).max(6)).max(10, {
  message: '태그는 최대 10개까지 추가할 수 있습니다',
});

export const CommentContentSchema = z
  .string()
  .trim()
  .min(1, {
    message: '댓글 내용은 비어 있을 수 없습니다',
  })
  .max(200, {
    message: '댓글 내용은 최대 200자까지 입력할 수 있습니다',
  });

export const DescriptionSchema = z
  .string()
  .max(500, {
    message: '설명은 최대 500자까지 입력할 수 있습니다',
  })
  .optional();
