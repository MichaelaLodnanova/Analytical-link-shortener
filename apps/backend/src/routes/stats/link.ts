import {
  AnonymizedUser,
  RequestStatsLinkGet,
  ResponseStatsLinkGet,
} from 'common';
import { ErrorResponse } from 'common/types/api/utils';
import { Request, Response, Router } from 'express';

import { linkStatsZod } from '../../../../../packages/common/validators/statsZod';
import { getLinkStatistics } from '../../controllers/linkStatsController';
import auth from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validationMiddleware';
import { handleErrorResp, handleOkResp } from '../../utils';

const linkStatsRouter = Router();

/**
 * This endpoint logs out a user. If the user is not logged in, then 400 is
 * returned.
 */
const linkStatsGetHandler = async (
  req: Request<never, never, never, RequestStatsLinkGet>,
  res: Response<ResponseStatsLinkGet | ErrorResponse>
) => {
  // We expect the auth middleware to do its work, so we type cast this
  const user = req.session.user as AnonymizedUser;

  const stats = await getLinkStatistics({
    userId: user.role == 'ADMIN' ? undefined : user.id,
    range:
      req.query.from && req.query.to
        ? {
            from: req.query.from,
            to: req.query.to,
          }
        : undefined,
    linkId: req.query.id,
  });

  if (stats.isErr) {
    console.error(stats.error.message);
    return handleErrorResp(
      500,
      res,
      'An error occurred while processing the request.'
    );
  }

  const data = stats.value;

  return handleOkResp(data, res);
};
linkStatsRouter.get(
  '/',
  auth(),
  validate({ query: linkStatsZod }),
  linkStatsGetHandler
);

export default linkStatsRouter;
