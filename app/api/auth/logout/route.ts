import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(): Promise<Response> {
  try {
    const cookieStore = await cookies();

    // 쿠키 삭제
    cookieStore.delete('accessToken');

    return NextResponse.json({ message: '로그아웃 되었습니다.' }, { status: 200 });
  } catch (err: unknown) {
    console.error('로그아웃 실패:', err);
    return NextResponse.json({ message: '로그아웃에 실패했습니다.' }, { status: 500 });
  }
}
