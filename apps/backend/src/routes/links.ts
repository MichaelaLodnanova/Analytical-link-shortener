import { RequestLinksGet, ResponseLinksGet } from 'common';
import { ErrorResponse } from 'common/types/api/utils';
import { paginationZod } from 'common/validators/paginationZod';
import { Request, Response, Router } from 'express';

import auth from '../middleware/authMiddleware';
import { validate } from '../middleware/validationMiddleware';
import { getLinks } from '../repository/linksRepository';
import { handleErrorResp, handleOkResp } from '../utils';

const linksRouter = Router();

/**
 * This endpoint returns the user data from the session storage. If there is
 * no cookie, then 401 is returned.
 * @returns user data
 */
export const getHandler = async (
  req: Request<never, never, never, RequestLinksGet>,
  res: Response<ResponseLinksGet | ErrorResponse>
) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know that user is authorized using auth middleware
  const user = req.session.user!;

  const links = await getLinks({
    ...req.query,
    ...(user?.role !== 'ADMIN' && { userId: user.id }),
  });

  if (links.isErr) {
    console.error(links.error);
    return handleErrorResp(400, res, 'An error occured while fetching links');
  }

  return handleOkResp(
    {
      next: {
        limit: req.query.limit,
        offset: req.query.offset + req.query.limit,
      },
      links: links.value,
    },
    res
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- we know that the query is validated
// @ts-ignore -- the middleware does not like number values :(
linksRouter.get('/', auth(), validate({ query: paginationZod }), getHandler);

export default linksRouter;
