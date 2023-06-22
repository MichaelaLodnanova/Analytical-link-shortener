import {
  AnonymizedUser,
  RequestStatsAdsGet,
  RequestStatsAdsPost,
  ResponseStatsAdsGet,
  ResponseStatsAdsPost,
  OptionalAdvertisementStatistics,
  advertisementStatsZod,
  postAdvertisementStatsZod,
  RequestStatsAdsPatch,
  ResponseStatsAdsPatch,
  RequestStatsAdsIdParams,
  patchAdvertisementStatsParamsZod,
  patchAdvertisementStatsBodyZod,
  PatchAdvertisementStatsParamsSchema,
  PatchAdvertisementStatsBodySchema,
} from 'common';
import { ErrorResponse } from 'common/types/api/utils';
import { NextFunction, Request, Response, Router } from 'express';

import {
  createAdvertisementStatistics,
  getAdvertisementStatistics,
  updateAdvertisementStatistics,
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
    Record<string, Result<OptionalAdvertisementStatistics>>
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
  resolveResult<OptionalAdvertisementStatistics>()
);

/**
 * Endpoint for updating advertisement statistics
 */
const advertisementsStatsPatchHandler = async (
  req: Request<RequestStatsAdsIdParams, never, RequestStatsAdsPatch, never>,
  res: Response<
    ResponseStatsAdsPatch | ErrorResponse,
    Record<string, Result<OptionalAdvertisementStatistics>>
  >,
  next: NextFunction
) => {
  const id = req.params.id as string;

  const stats = await updateAdvertisementStatistics({
    id: id,
    ...req.body,
  });

  res.locals.result = stats;
  next();
};
linkStatsRouter.patch(
  '/:id',
  validate<
    PatchAdvertisementStatsParamsSchema,
    PatchAdvertisementStatsBodySchema
  >({
    params: patchAdvertisementStatsParamsZod,
    body: patchAdvertisementStatsBodyZod,
  }),
  advertisementsStatsPatchHandler,
  resolveResult<OptionalAdvertisementStatistics>()
);

export default linkStatsRouter;
