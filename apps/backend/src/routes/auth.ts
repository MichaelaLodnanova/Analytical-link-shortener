import { Request, Response, Router } from 'express';
import auth from '../middleware/authMiddleware';
import { client } from 'model';
import {
  RequestAuthCreate,
  RequestAuthGet,
  RequestAuthLogin,
  RequestAuthLogout,
  ResponseAuthCreate,
  ResponseAuthGet,
  ResponseAuthLogin,
  ResponseAuthLogout,
  ResponseError,
  loginUserZod,
  registerUserZod,
} from 'common';
import { errorResponse } from '../utils';
import { loginUser, registerUser } from '../controllers/authController';
import { UserAlreadyExists, UserNotFound } from '../repository/errors';

const authRouter = Router();

/**
 * This endpoint returns the user data from the session storage. If there is
 * no cookie, then 401 is returned.
 * @returns user data
 */
export const getHandler = async (
  req: Request<never, never, never, RequestAuthGet>,
  res: Response<ResponseAuthGet | ResponseError>
) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know that user is authorized using auth middleware
  const id = req.session.user!.id;

  const user = await client.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
    },
  });

  if (!user) {
    res.status(404).json(errorResponse('Something went wrong!'));
    return;
  }

  res.json({ user });
};
authRouter.get('/', auth(), getHandler);

/**
 * This endpoint registers a new user. If the user already exists, then 400 is
 * returned.
 * @returns new user data
 */
const createHandler = async (
  req: Request<never, never, never, RequestAuthCreate>,
  res: Response<ResponseAuthCreate | ResponseError>
) => {
  const result = await registerUserZod.safeParseAsync(req.body);
  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  const user = await registerUser(result.data);

  if (user.isErr && user.error instanceof UserAlreadyExists) {
    res.status(400).json(errorResponse(user.error.message));
    return;
  }

  if (user.isErr) {
    res
      .status(400)
      .json(errorResponse('An error occurred while registering user'));
    return;
  }

  res.json({ message: 'ok' });
};
authRouter.post('/registration', createHandler);

/**
 * This endpoint logs in a user. If the user does not exist, then 404 is
 * returned.
 * @param req
 * @param res
 * @returns ok
 */
const loginHandler = async (
  req: Request<never, never, never, RequestAuthLogin>,
  res: Response<ResponseAuthLogin | ResponseError>
) => {
  const result = await loginUserZod.safeParseAsync(req.body);
  if (!result.success) {
    res.status(400).json(result.error);
    return;
  }

  const user = await loginUser(result.data);

  if (user.isErr && user.error instanceof UserNotFound) {
    res.status(404).json(errorResponse('User not found'));
    return;
  }

  if (user.isErr) {
    console.error(user.error);
    res.status(400).json(errorResponse('An error occurred'));
    return;
  }

  req.session.user = user.value;
  res.json({ message: 'ok' });
};
authRouter.post('/login', loginHandler);

/**
 * This endpoint logs out a user. If the user is not logged in, then 400 is
 * returned.
 */
const logoutHandler = async (
  req: Request<never, never, never, RequestAuthLogout>,
  res: Response<ResponseAuthLogout | ResponseError>
) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(400).json(errorResponse('An error occurred'));
      return;
    }
  });

  res.json({ message: 'ok' });
};
authRouter.post('/logout', logoutHandler);

export default authRouter;
