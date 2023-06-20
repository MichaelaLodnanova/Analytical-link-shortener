import { hash, verify } from 'argon2';
import { AnonymizedUser, PResult } from 'common';
import { createUser, getUserByUsername } from '../repository/usersRepository';
import { Result } from '@badrap/result';
import { UserNotFound } from '../repository/errors';

/**
 * Registers a new user and generates a password hash for him
 * @param param0 user data
 * @returns new anonymized user entity
 */
export const registerUser: (data: {
  email: string;
  username: string;
  name: string;
  surname: string;
  password: string;
}) => PResult<AnonymizedUser> = async ({
  email,
  username,
  name,
  surname,
  password,
}) => {
  const passwordHash = await hash(password);

  const user = await createUser({
    email,
    username,
    name,
    surname,
    passwordHash,
  });

  return user;
};

export const loginUser: (data: {
  username: string;
  password: string;
}) => PResult<AnonymizedUser> = async ({ username, password }) => {
  const user = await getUserByUsername(username);

  if (user.isErr) {
    return user;
  }

  const passwordOk = await verify(user.value.passwordHash, password);
  if (!passwordOk) {
    return Result.err(new UserNotFound());
  }

  return Result.ok({
    id: user.value.id,
    email: user.value.email,
    username: user.value.username,
    name: user.value.name,
    surname: user.value.surname,
    role: user.value.role,
  });
};
