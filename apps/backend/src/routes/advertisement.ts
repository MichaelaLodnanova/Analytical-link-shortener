import { NextFunction, Request, Response, Router } from 'express';
import auth from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';
import resolveResult from '../middleware/resolutionMiddleware';
import {
  AnonymizedUser,
  CreateAdvertisementSchema,
  DateLessAdvertisement,
  DeleteAdvertisementSchema,
  GetAdvertisementSchema,
  GetAllAdvertisementsSchema,
  RequestAdvertisementIdParams,
  RequestAdvertisementPatchReqBody,
  RequestAdvertisementPostReqBody,
  ResponseAdvertisementDelete,
  ResponseAdvertisementGet,
  ResponseAdvertisementPatch,
  ResponseAdvertisementPost,
  UpdateAdvertisementBodySchema,
  UpdateAdvertisementParamsSchema,
  createAdvertisementZod,
  deleteAdvertisementZod,
  getAdvertisementZod,
  getAllAdvertisementsZod,
  updateAdvertisementBodyZod,
  updateAdvertisementParamsZod,
} from 'common';
import { ErrorResponse } from 'common/types/api/utils';
import {
  createAdvertisement,
  deleteAdvertisement,
  getAdvertisement,
  getAllAdvertisments,
  updateAdvertisement,
} from '../controllers/advertisementController';
import { Result } from '@badrap/result';
import { AccessRightsError } from '../repository/errors';
import { handleErrorResp } from '../utils';
import { Advertisement, Role } from 'model';

const advertisementRouter = Router();

/**
 * Endpoint for getting advertisement by original id with ads statistics
 */
const advertisementGetHandler = async (
  req: Request<RequestAdvertisementIdParams, never, never, never>,
  res: Response<
    ResponseAdvertisementGet | ErrorResponse,
    Record<string, Result<DateLessAdvertisement>>
  >,
  next: NextFunction
) => {
  const id = req.params.id as string;

  const advertisement = await getAdvertisement({
    id,
  });

  // TODO - handle specific error types

  res.locals.result = advertisement;
  next();
};
advertisementRouter.get(
  '/id/:id',
  auth(Role.ADVERTISER),
  validate<GetAdvertisementSchema>({ params: getAdvertisementZod }),
  advertisementGetHandler,
  resolveResult<DateLessAdvertisement>()
);

/**
 * Endpoint for getting paginated all advertisement of user. Only a owner or admin can
 * access the data.
 *
 * Advertisements are in desc order.
 */
const allAdvertisementsOfAdvertiserGetHandler = async (
  req: Request<RequestAdvertisementIdParams, never, never, never>,
  res: Response<
    RequestAdvertisementIdParams | ErrorResponse,
    Record<string, Result<DateLessAdvertisement[]>>
  >,
  next: NextFunction
) => {
  const user = req.session.user as AnonymizedUser;
  const userId = req.params.userId as string;

  const advertisements = await getAllAdvertisments({
    userId,
    requesterId: user.id,
  });

  // TODO - handle specific error types
  if (advertisements.isErr) {
    console.error(advertisements.error.message);
    if (advertisements.error instanceof AccessRightsError) {
      return handleErrorResp(403, res, advertisements.error.message);
    }
  }

  res.locals.result = advertisements;
  next();
};
advertisementRouter.get(
  '/all/:userId',
  auth(Role.ADVERTISER),
  validate<GetAllAdvertisementsSchema>({
    params: getAllAdvertisementsZod,
  }),
  allAdvertisementsOfAdvertiserGetHandler,
  resolveResult<DateLessAdvertisement[]>()
);

/**
 * Endpoint for creating advertisement - advertisement can be created only by registered and logged in user
 */
const advertisementPostHandler = async (
  req: Request<never, never, RequestAdvertisementPostReqBody, never>,
  res: Response<
    ResponseAdvertisementPost | ErrorResponse,
    Record<string, Result<DateLessAdvertisement>>
  >,
  next: NextFunction
) => {
  const user = req.session.user as AnonymizedUser;
  const createAdvertisementData = req.body;

  const createdAdvertisement = await createAdvertisement({
    createdById: user.id,
    ...createAdvertisementData,
  });

  // TODO - handle specific error types

  res.locals.result = createdAdvertisement;
  next();
};
advertisementRouter.post(
  '/',
  auth(Role.ADVERTISER),
  validate<unknown, CreateAdvertisementSchema, unknown>({
    body: createAdvertisementZod,
  }),
  advertisementPostHandler,
  resolveResult<DateLessAdvertisement>()
);

/**
 * Endpoint for updating advertisement
 */
const advertisementPatchHandler = async (
  req: Request<
    RequestAdvertisementIdParams,
    never,
    RequestAdvertisementPatchReqBody,
    never
  >,
  res: Response<
    ResponseAdvertisementPatch | ErrorResponse,
    Record<string, Result<DateLessAdvertisement>>
  >,
  next: NextFunction
) => {
  const user = req.session.user as AnonymizedUser;
  const advertisementId = req.params.id as string;
  const updateadvertisementData = req.body;

  const updatedLink = await updateAdvertisement({
    id: advertisementId,
    ...updateadvertisementData,
    requesterId: user.id,
  });

  // TODO - handle specific error types
  if (updatedLink.isErr) {
    console.error(updatedLink.error.message);
    if (updatedLink.error instanceof AccessRightsError) {
      return handleErrorResp(403, res, updatedLink.error.message);
    }
  }

  res.locals.result = updatedLink;
  next();
};
advertisementRouter.patch(
  '/:id',
  auth(Role.ADVERTISER),
  validate<UpdateAdvertisementParamsSchema, UpdateAdvertisementBodySchema>({
    params: updateAdvertisementParamsZod,
    body: updateAdvertisementBodyZod,
  }),
  advertisementPatchHandler,
  resolveResult<DateLessAdvertisement>()
);

/**
 * Endpoint for removing advertisement
 */
const advertisementDeleteHandler = async (
  req: Request<RequestAdvertisementIdParams, never, never, never>,
  res: Response<
    ResponseAdvertisementDelete | ErrorResponse,
    Record<string, Result<Advertisement>>
  >,
  next: NextFunction
) => {
  const user = req.session.user as AnonymizedUser;
  const advertisementId = req.params.id as string;

  const deletedAdvertisement = await deleteAdvertisement({
    id: advertisementId,
    requesterId: user.id,
  });

  // TODO - handle specific error types
  if (deletedAdvertisement.isErr) {
    console.error(deletedAdvertisement.error.message);
    if (deletedAdvertisement.error instanceof AccessRightsError) {
      return handleErrorResp(403, res, deletedAdvertisement.error.message);
    }
  }

  res.locals.result = deletedAdvertisement;
  next();
};
advertisementRouter.delete(
  '/:id',
  auth(Role.ADVERTISER),
  validate<DeleteAdvertisementSchema>({ params: deleteAdvertisementZod }),
  advertisementDeleteHandler,
  resolveResult<Advertisement>()
);

export default advertisementRouter;
