import { NextFunction, Request, Response, Router } from 'express';
import auth from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';
import resolveResult from '../middleware/resolutionMiddleware';
import {
  AnonymizedUser,
  CreateLinkSchema,
  DateLessLink,
  DeleteLinkSchema,
  GetAllLinksSchema,
  GetLinkSchema,
  PaginationSchema,
  RequestLinkIdParams,
  RequestLinkPatchReqBody,
  RequestLinkPostReqBody,
  RequestViewLinkQuery,
  RequestAllLinksGetQuery,
  ResponseLinkDelete,
  ResponseLinkGet,
  ResponseViewLinkGet,
  ViewLinkSchema,
  createLinkZod,
  deleteLinkZod,
  getAllLinksZod,
  getLinkZod,
  paginationZod,
  updateLinkBodyZod,
  updateLinkParamsZod,
  viewLinkZod,
  ResponseAllLinksGet,
  PaginatedLink,
  RequestAllLinksIdParams,
  ViewLinkData,
} from 'common';
import { ErrorResponse } from 'common/types/api/utils';
import {
  createLink,
  deleteLink,
  getAllLinks,
  getLink,
  updateLink,
  viewLink,
} from '../controllers/linkController';
import { Result } from '@badrap/result';
import { AccessRightsError } from '../repository/errors';
import { handleErrorResp } from '../utils';
import { Link, Role } from 'model';

const linkRouter = Router();

/**
 * Endpoint for getting link by original id
 */
const linkGetHandler = async (
  req: Request<RequestLinkIdParams, never, never, never>,
  res: Response<
    ResponseLinkGet | ErrorResponse,
    Record<string, Result<DateLessLink>>
  >,
  next: NextFunction
) => {
  const id = req.params.id as string;

  const link = await getLink({
    id,
  });

  res.locals.result = link;
  next();
};
linkRouter.get(
  '/id/:id',
  auth(),
  validate<GetLinkSchema>({ params: getLinkZod }),
  linkGetHandler,
  resolveResult<DateLessLink>()
);

/**
 * Endpoint for getting paginated all links of user. Only a owner or admin can
 * access the data.
 *
 * Links are in desc order.
 */
const allLinksOfUserGetHandler = async (
  req: Request<RequestAllLinksIdParams, never, never, RequestAllLinksGetQuery>,
  res: Response<
    ResponseAllLinksGet | ErrorResponse,
    Record<string, Result<PaginatedLink>>
  >,
  next: NextFunction
) => {
  const user = req.session.user as AnonymizedUser;
  const userId = req.params.userId;
  const query = req.query;

  const links = await getAllLinks({
    userId: userId,
    requesterId: user.role !== Role.ADMIN ? user.id : undefined,
    ...query,
  });

  if (links.isErr) {
    if (links.error instanceof AccessRightsError) {
      console.error(links.error.message);
      return handleErrorResp(403, res, links.error.message);
    }
  }

  res.locals.result = links;
  next();
};
linkRouter.get(
  '/all/:userId?',
  auth(),
  validate<GetAllLinksSchema, unknown, PaginationSchema>({
    params: getAllLinksZod,
    query: paginationZod,
  }),
  allLinksOfUserGetHandler,
  resolveResult<PaginatedLink>()
);

/**
 * Endpoint for handling redirect request by short id
 */
const viewLinkGetHandler = async (
  req: Request<RequestLinkIdParams, never, never, RequestViewLinkQuery>,
  res: Response<
    ResponseViewLinkGet | ErrorResponse,
    Record<string, Result<ViewLinkData>>
  >,
  next: NextFunction
) => {
  const shortId = req.params.id as string;
  const data = req.query;

  const link = await viewLink({
    shortId,
    region: data.region,
    language: data.language,
  });

  res.locals.result = link;
  next();
};
linkRouter.get(
  '/:id',
  validate<GetLinkSchema, ViewLinkSchema>({
    params: getLinkZod,
    query: viewLinkZod,
  }),
  viewLinkGetHandler,
  resolveResult<ViewLinkData>()
);

/**
 * Endpoint for creating link - link can be created only by registered and logged in user
 */
const linkPostHandler = async (
  req: Request<never, never, RequestLinkPostReqBody, never>,
  res: Response<
    ResponseLinkGet | ErrorResponse,
    Record<string, Result<DateLessLink>>
  >,
  next: NextFunction
) => {
  const user = req.session.user as AnonymizedUser;
  const createLinkData = req.body;

  const createdLink = await createLink({
    createdById: user.id,
    ...createLinkData,
  });

  res.locals.result = createdLink;
  next();
};
linkRouter.post(
  '/',
  auth(),
  validate<unknown, CreateLinkSchema, unknown>({ body: createLinkZod }),
  linkPostHandler,
  resolveResult<DateLessLink>()
);

/**
 * Endpoint for updating link
 */
const linkPatchHandler = async (
  req: Request<RequestLinkIdParams, never, RequestLinkPatchReqBody, never>,
  res: Response<
    ResponseLinkGet | ErrorResponse,
    Record<string, Result<DateLessLink>>
  >,
  next: NextFunction
) => {
  const user = req.session.user as AnonymizedUser;
  const linkId = req.params.id as string;
  const updateLinkData = req.body;

  const updatedLink = await updateLink({
    id: linkId,
    isAdvertisementEnabled: updateLinkData.isAdvertisementEnabled,
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
linkRouter.patch(
  '/:id',
  auth(),
  validate({ params: updateLinkParamsZod, body: updateLinkBodyZod }),
  linkPatchHandler,
  resolveResult<DateLessLink>()
);

/**
 * Endpoint for removing link
 */
const linkDeleteHandler = async (
  req: Request<RequestLinkIdParams, never, never, never>,
  res: Response<
    ResponseLinkDelete | ErrorResponse,
    Record<string, Result<Link>>
  >,
  next: NextFunction
) => {
  const user = req.session.user as AnonymizedUser;
  const linkId = req.params.id as string;

  const deletedLink = await deleteLink({
    id: linkId,
    requesterId: user.id,
  });

  if (deletedLink.isErr) {
    if (deletedLink.error instanceof AccessRightsError) {
      console.error(deletedLink.error.message);
      return handleErrorResp(403, res, deletedLink.error.message);
    }
  }

  res.locals.result = deletedLink;
  next();
};
linkRouter.delete(
  '/:id',
  auth(),
  validate<DeleteLinkSchema>({ params: deleteLinkZod }),
  linkDeleteHandler,
  resolveResult<Link>()
);

export default linkRouter;
