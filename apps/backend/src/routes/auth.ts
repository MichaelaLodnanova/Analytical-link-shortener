import { Request, Response, Router } from 'express';
import auth from '../middleware/authMiddleware';
import { client } from 'model';
import {
  RequestAuthCreate,
  RequestAuthGet,
  RequestAuthLogin,
  RequestAuthLogout,
  RequestAuthUpdateUser,
  ResponseAuthCreate,
  ResponseAuthGet,
  ResponseAuthLogin,
  ResponseAuthLogout,
  ResponseAuthUpdateUser,
  loginUserZod,
  registerUserZod,
  updateUserZod,
} from 'common';
import {
  loginUser,
  registerUser,
  updateUser,
} from '../controllers/authController';
import { UserAlreadyExists, UserNotFound } from '../repository/errors';
import { validate } from '../middleware/validationMiddleware';
import { ErrorResponse } from 'common/types/api/utils';
import { handleErrorResp, handleOkResp } from '../utils';

const authRouter = Router();

/**
 * This endpoint returns the user data from the session storage. If there is
 * no cookie, then 401 is returned.
 * @returns user data
 */
export const getHandler = async (
  req: Request<never, never, never, RequestAuthGet>,
  res: Response<ResponseAuthGet | ErrorResponse>
) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know that user is authorized using auth middleware
  const id = req.session.user!.id;

  const user = await client.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      surname: true,
      role: true,
    },
  });

  if (!user) {
    return handleErrorResp(400, res, 'User not found.');
  }

  return handleOkResp(user, res);
};
authRouter.get('/', auth(), getHandler);

export const updateHandler = async (
  req: Request<never, never, RequestAuthUpdateUser, never>,
  res: Response<ResponseAuthUpdateUser | ErrorResponse>
) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know that user is authorized using auth middleware
  const id = req.session.user!.id;

  const user = await updateUser({ id, ...req.body });

  if (user.isErr && user.error instanceof UserAlreadyExists) {
    return handleErrorResp(400, res, user.error.message);
  }

  if (user.isErr) {
    return handleErrorResp(400, res, 'An error occurred while updating user');
  }

  return handleOkResp('ok', res);
};
authRouter.put(
  '/',
  auth(),
  validate({
    body: updateUserZod,
  }),
  updateHandler
);
/**
 * This endpoint registers a new user. If the user already exists, then 400 is
 * returned.
 * @returns new user data
 */
const createHandler = async (
  req: Request<never, never, RequestAuthCreate, never>,
  res: Response<ResponseAuthCreate | ErrorResponse>
) => {
  const user = await registerUser(req.body);

  if (user.isErr && user.error instanceof UserAlreadyExists) {
    return handleErrorResp(400, res, user.error.message);
  }

  if (user.isErr) {
    return handleErrorResp(
      400,
      res,
      'An error occurred while registering user'
    );
  }

  return handleOkResp('ok', res);
};
authRouter.post(
  '/registration',
  validate({ body: registerUserZod }),
  createHandler
);

/**
 * This endpoint logs in a user. If the user does not exist, then 404 is
 * returned.
 * @param req
 * @param res
 * @returns ok
 */
const loginHandler = async (
  req: Request<never, never, RequestAuthLogin, never>,
  res: Response<ResponseAuthLogin | ErrorResponse>
) => {
  const user = await loginUser(req.body);

  if (user.isErr && user.error instanceof UserNotFound) {
    return handleErrorResp(404, res, 'User not found');
  }

  if (user.isErr) {
    return handleErrorResp(400, res, 'An error occurred');
  }

  req.session.user = user.value;
  return handleOkResp('ok', res);
};
authRouter.post(
  '/login',
  validate({
    body: loginUserZod,
  }),
  loginHandler
);

/**
 * This endpoint logs out a user. If the user is not logged in, then 400 is
 * returned.
 */
const logoutHandler = async (
  req: Request<never, never, never, RequestAuthLogout>,
  res: Response<ResponseAuthLogout | ErrorResponse>
) => {
  req.session.destroy((err) => {
    if (err) {
      return handleErrorResp(400, res, 'An error occurred');
    }
  });

  return handleOkResp('ok', res);
};
authRouter.post('/logout', logoutHandler);

export default authRouter;
