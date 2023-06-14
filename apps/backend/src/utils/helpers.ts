import {
  ErrorResponse,
  SuccessResponse,
  ValidationErrorResponse,
} from 'common/types/api/utils';
import { Response } from 'express';

import z from 'zod';
import { generateErrorMessage } from 'zod-error';

export function handleErrorResp(
  status: number,
  res: Response,
  msg: string
): Response<ErrorResponse> {
  return res.status(status).send({
    status: 'error',
    data: {},
    message: msg,
  });
}

export function handleOkResp<T>(
  data: T,
  res: Response<SuccessResponse<T>>,
  msg?: string
): Response<SuccessResponse<T>> {
  return res.send({
    status: 'success',
    data: data,
    message: msg,
  });
}

export function handleValidationErrorResp(
  error: z.ZodError,
  res: Response
): Response<ValidationErrorResponse> {
  console.log(error);
  return res.status(400).send({
    status: 'error',
    message: `Validation error: ${generateErrorMessage(error.issues)}`,
  });
}
