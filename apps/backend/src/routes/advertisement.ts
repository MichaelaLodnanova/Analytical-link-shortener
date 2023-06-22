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
  PaginatedAdvertisement,
  PaginationSchema,
  RequestAdvertisementIdParams,
  RequestAdvertisementPatchReqBody,
  RequestAdvertisementPostReqBody,
  RequestAllAdvertisementsIdParams,
  RequestAllAdvertisementsGetQuery,
  ResponseAdvertisementDelete,
  ResponseAdvertisementGet,
  ResponseAdvertisementPatch,
  ResponseAdvertisementPost,
  ResponseAllAdvertisementsGet,
  UpdateAdvertisementBodySchema,
  UpdateAdvertisementParamsSchema,
  createAdvertisementZod,
  deleteAdvertisementZod,
  getAdvertisementZod,
  getAllAdvertisementsZod,
  paginationZod,
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
const getHandler = async (
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

  res.locals.result = advertisement;
  next();
};
advertisementRouter.get(
  '/id/:id',
  auth(Role.ADVERTISER, Role.ADMIN),
  validate<GetAdvertisementSchema>({ params: getAdvertisementZod }),
  getHandler,
  resolveResult<DateLessAdvertisement>()
);

/**
 * Endpoint for getting paginated all advertisement of user. Only a owner or admin can
 * access the data.
 *
 * Advertisements are in desc order.
 */
const getAllHandler = async (
  req: Request<
    RequestAllAdvertisementsIdParams,
    never,
    never,
    RequestAllAdvertisementsGetQuery
  >,
  res: Response<
    ResponseAllAdvertisementsGet | ErrorResponse,
    Record<string, Result<PaginatedAdvertisement>>
  >,
  next: NextFunction
) => {
  const user = req.session.user as AnonymizedUser;
  const userId = req.params.userId;
  const query = req.query;

  const advertisements = await getAllAdvertisments({
    userId: userId,
    requesterId: user.role !== Role.ADMIN ? user.id : undefined,
    ...query,
  });

  if (advertisements.isErr) {
    if (advertisements.error instanceof AccessRightsError) {
      console.error(advertisements.error.message);
      return handleErrorResp(403, res, advertisements.error.message);
    }
  }

  res.locals.result = advertisements;
  next();
};
advertisementRouter.get(
  '/all/:userId?',
  auth(Role.ADVERTISER, Role.ADMIN),
  validate<GetAllAdvertisementsSchema, unknown, PaginationSchema>({
    params: getAllAdvertisementsZod,
    query: paginationZod,
  }),
  getAllHandler,
  resolveResult<PaginatedAdvertisement>()
);

/**
 * Endpoint for creating advertisement - advertisement can be created only by
 * registered and logged in advertiser/admin.
 */
const postHandler = async (
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

  res.locals.result = createdAdvertisement;
  next();
};
advertisementRouter.post(
  '/',
  auth(Role.ADVERTISER, Role.ADMIN),
  validate<unknown, CreateAdvertisementSchema, unknown>({
    body: createAdvertisementZod,
  }),
  postHandler,
  resolveResult<DateLessAdvertisement>()
);

/**
 * Endpoint for updating advertisement
 */
const patchHandler = async (
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

  if (updatedLink.isErr) {
    if (updatedLink.error instanceof AccessRightsError) {
      console.error(updatedLink.error.message);
      return handleErrorResp(403, res, updatedLink.error.message);
    }
  }

  res.locals.result = updatedLink;
  next();
};
advertisementRouter.patch(
  '/:id',
  auth(Role.ADVERTISER, Role.ADMIN),
  validate<UpdateAdvertisementParamsSchema, UpdateAdvertisementBodySchema>({
    params: updateAdvertisementParamsZod,
    body: updateAdvertisementBodyZod,
  }),
  patchHandler,
  resolveResult<DateLessAdvertisement>()
);

/**
 * Endpoint for removing advertisement
 */
const deleteHandler = async (
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

  if (deletedAdvertisement.isErr) {
    if (deletedAdvertisement.error instanceof AccessRightsError) {
      console.error(deletedAdvertisement.error.message);
      return handleErrorResp(403, res, deletedAdvertisement.error.message);
    }
  }

  res.locals.result = deletedAdvertisement;
  next();
};
advertisementRouter.delete(
  '/:id',
  auth(Role.ADVERTISER, Role.ADMIN),
  validate<DeleteAdvertisementSchema>({ params: deleteAdvertisementZod }),
  deleteHandler,
  resolveResult<Advertisement>()
);

export default advertisementRouter;
