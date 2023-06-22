import {
  AnonymizedUser,
  RequestStatsAdsGet,
  RequestStatsAdsPost,
  ResponseStatsAdsGet,
  ResponseStatsAdsPost,
  ResponseStatsAdsPostData,
  advertisementStatsZod,
  postAdvertisementStatsZod,
} from 'common';
import { ErrorResponse } from 'common/types/api/utils';
import { NextFunction, Request, Response, Router } from 'express';

import {
  createAdvertisementStatistics,
  getAdvertisementStatistics,
} from '../../controllers/advertisementStatsController';
import auth from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validationMiddleware';
import { handleErrorResp, handleOkResp } from '../../utils';
import resolveResult from '../../middleware/resolutionMiddleware';
import { Result } from '@badrap/result';

const linkStatsRouter = Router();

/**
 * Endpoint for getting advertisement statistics
 */
const advertisementsStatsGetHandler = async (
  req: Request<never, never, never, RequestStatsAdsGet>,
  res: Response<ResponseStatsAdsGet | ErrorResponse>
) => {
  // We expect the auth middleware to do its work, so we type cast this
  const user = req.session.user as AnonymizedUser;

  const stats = await getAdvertisementStatistics({
    userId: user.role == 'ADMIN' ? undefined : user.id,
    range:
      req.query.from && req.query.to
        ? {
            from: req.query.from,
            to: req.query.to,
          }
        : undefined,
    adId: req.query.id,
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
  auth('ADVERTISER', 'ADMIN'),
  validate({ query: advertisementStatsZod }),
  advertisementsStatsGetHandler
);

/**
 * Endpoint for creating advertisement statistics
 */
const advertisementsStatsPostHandler = async (
  req: Request<never, never, RequestStatsAdsPost, never>,
  res: Response<
    ResponseStatsAdsPost | ErrorResponse,
    Record<string, Result<ResponseStatsAdsPostData>>
  >,
  next: NextFunction
) => {
  const stats = await createAdvertisementStatistics(req.body);

  res.locals.result = stats;
  next();
};
linkStatsRouter.post(
  '/',
  validate({ body: postAdvertisementStatsZod }),
  advertisementsStatsPostHandler,
  resolveResult<ResponseStatsAdsPostData>()
);

export default linkStatsRouter;
