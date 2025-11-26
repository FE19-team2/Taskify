import { NextResponse } from 'next/server';
import { BEclient } from '@/lib/api/server/api-client';
import {
  CreateCardRequest,
  CreateCardResponse,
  createCardResDto,
  createCardReqDto,
  getCardsQueryDto,
  GetCardsQuery,
  getCardsResDto,
  getCardsResponse,
} from '@/lib/api/validations/cards';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createCardReqDto.parse(body);

    const backendRes = await BEclient.post<CreateCardResponse, CreateCardRequest>(
      '/cards',
      validatedData,
    );
    const data = createCardResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error';

    return NextResponse.json({ message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const raw = {
      columnId: searchParams.get('columnId'),
      size: searchParams.get('size'),
      cursorId: searchParams.get('cursorId'),
    };

    const validParams: GetCardsQuery = getCardsQueryDto.parse(raw);

    const query = new URLSearchParams({
      columnId: String(validParams.columnId),
      ...(validParams.size && { size: String(validParams.size) }),
      ...(validParams.cursorId && { cursorId: String(validParams.cursorId) }),
    });

    const backendRes = await BEclient.get<getCardsResponse>(`/cards?${query.toString()}`);
    const data = getCardsResDto.parse(backendRes);

    return NextResponse.json(data);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error';

    return NextResponse.json({ message }, { status: 400 });
  }
}
