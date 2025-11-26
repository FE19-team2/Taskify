import { ZodError } from 'zod';
import { HttpError } from './request-core';
import { NextResponse } from 'next/server';

type ErrorResult = {
  status: number;
  message: string;
  headers?: HeadersInit;
};

export function checkErrorType(err: unknown): ErrorResult {
  let status = 500;
  let message = 'Internal Server Error';

  if (err instanceof HttpError) {
    status = err.status;
    message = err.message;
  } else if (err instanceof ZodError) {
    status = 400;
    message = err.issues?.[0]?.message ?? 'Invalid request data';
  } else if (err instanceof Error) {
    message = err.message;
  }

  return { status, message };
}

export function createErrorResponse(err: unknown) {
  const { status, message } = checkErrorType(err);

  return NextResponse.json(
    { message },
    {
      status,
      headers: { 'Cache-Control': 'no-store' },
    },
  );
}
