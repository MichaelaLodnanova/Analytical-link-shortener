import { Result } from '@badrap/result';
import { Request, Response } from 'express';
import { handleErrorResp, handleOkResp } from '../utils';
import { ErrorResponse, SuccessResponse } from 'common/types/api/utils';
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../repository/errors';

/**
 * Middleware resolving result object.
 */
const resolveResult =
  <T = unknown>() =>
  (
    req: Request,
    res: Response<SuccessResponse<T> | ErrorResponse, Record<string, Result<T>>>
  ) => {
    const result = res.locals.result;

    if (result.isErr) {
      console.error(result.error.message);
      if (
        result.error instanceof NonexistentRecordError ||
        result.error instanceof DeletedRecordError
      ) {
        return handleErrorResp(404, res, result.error.message);
      }

      return handleErrorResp(
        500,
        res,
        'An error occurred while processing the request.'
      );
    }

    const data = result.value;

    return handleOkResp(data, res);
  };

export default resolveResult;
