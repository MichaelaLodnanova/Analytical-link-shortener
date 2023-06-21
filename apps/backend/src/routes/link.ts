import { NextFunction, Request, Response, Router } from 'express';
import auth from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';
import resolveResult from '../middleware/resolutionMiddleware';
import {
  AnonymizedUser,
  CreateLinkSchema,
  DateLessLink,
  GetAllLinksSchema,
  GetLinkSchema,
  RequestLinkIdParams,
  RequestLinkPatchReqBody,
  RequestLinkPostReqBody,
  ResponseLinkDelete,
  ResponseLinkGet,
  createLinkZod,
  getAllLinksZod,
  getLinkZod,
  updateLinkBodyZod,
  updateLinkParamsZod,
} from 'common';
import { ErrorResponse } from 'common/types/api/utils';
import {
  createLink,
  deleteLink,
  getAllLinks,
  getLink,
  updateLink,
} from '../controllers/linkController';
import { Result } from '@badrap/result';
import { AccessRightsError } from '../repository/errors';
import { handleErrorResp } from '../utils';
import { Link } from 'model';

const linkRouter = Router();

/**
 * Endpoint for getting link
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

  // TODO - handle specific error types

  res.locals.result = link;
  next();
};
linkRouter.get(
  '/id/:id',
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
  req: Request<RequestLinkIdParams, never, never, never>,
  res: Response<
    ResponseLinkGet | ErrorResponse,
    Record<string, Result<DateLessLink[]>>
  >,
  next: NextFunction
) => {
  const user = req.session.user as AnonymizedUser;
  const userId = req.params.userId as string;

  const links = await getAllLinks({
    userId,
    requesterId: user.id,
  });

  // TODO - handle specific error types
  if (links.isErr) {
    console.error(links.error.message);
    if (links.error instanceof AccessRightsError) {
      return handleErrorResp(403, res, links.error.message);
    }
  }

  res.locals.result = links;
  next();
};
linkRouter.get(
  '/all/:userId',
  auth(),
  validate<GetAllLinksSchema>({
    params: getAllLinksZod,
  }),
  allLinksOfUserGetHandler,
  resolveResult<DateLessLink[]>()
);

/**
 * Endpoint for creating link
 */
const linkPostHandler = async (
  req: Request<never, never, RequestLinkPostReqBody, never>,
  res: Response<
    ResponseLinkGet | ErrorResponse,
    Record<string, Result<DateLessLink>>
  >,
  next: NextFunction
) => {
  const createLinkData = req.body;

  const createdLink = await createLink({
    ...createLinkData,
  });

  // TODO - handle specific error types

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
    ...updateLinkData,
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

  // TODO - handle specific error types
  if (deletedLink.isErr) {
    console.error(deletedLink.error.message);
    if (deletedLink.error instanceof AccessRightsError) {
      return handleErrorResp(403, res, deletedLink.error.message);
    }
  }

  res.locals.result = deletedLink;
  next();
};
linkRouter.delete(
  '/:id',
  auth(),
  validate({}),
  linkDeleteHandler,
  resolveResult<Link>()
);

export default linkRouter;
