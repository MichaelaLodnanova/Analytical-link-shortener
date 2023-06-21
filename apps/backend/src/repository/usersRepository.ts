import { Result } from '@badrap/result';
import { AnonymizedUser, PResult } from 'common';
import { User, client } from 'model';
import { UserAlreadyExists, UserNotFound } from './errors';

/**
 * Get user by id
 * @param id user id
 * @returns anonymized user entity
 */
export const getUserById: (id: string) => PResult<AnonymizedUser> = async (
  id
) => {
  try {
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
      return Result.err(new UserNotFound());
    }

    return Result.ok(user);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};
export const getUserAuthorizedById: (id: string) => PResult<User> = async (
  id
) => {
  try {
    const user = await client.user.findUnique({
      where: { id },
    });
    if (!user) {
      return Result.err(new UserNotFound());
    }
    return Result.ok(user);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};
export const updateUser: (data: {
  id: string;
  name?: string;
  surname?: string;
  passwordHash?: string;
}) => PResult<AnonymizedUser> = async ({ id, name, surname, passwordHash }) => {
  const transactionResult = await client.$transaction(async (prisma) => {
    const user = await prisma.user.findUnique({
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
      return Result.err(new UserNotFound());
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        surname,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        surname: true,
        role: true,
      },
    });

    return Result.ok(updatedUser);
  });

  return transactionResult;
};

/**
 * Get user by id
 * @param id user id
 * @returns anonymized user entity
 */
export const createUser: (data: {
  email: string;
  username: string;
  name?: string;
  surname?: string;
  passwordHash: string;
  role: 'USER' | 'ADVERTISER';
}) => PResult<AnonymizedUser> = async ({
  email,
  username,
  name,
  surname,
  passwordHash,
  role,
}) => {
  try {
    const existingUser = await client.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser && existingUser.email === email) {
      return Result.err(new UserAlreadyExists('email'));
    }

    if (existingUser && existingUser.username === username) {
      return Result.err(new UserAlreadyExists('username'));
    }

    const user = await client.user.create({
      data: {
        email,
        username,
        name,
        surname,
        passwordHash,
        role,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        surname: true,
        role: true,
      },
    });

    return Result.ok(user);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

/**
 * Get user by username
 * @param username user username
 * @returns complete user entity
 */
export const getUserByUsername: (username: string) => PResult<User> = async (
  username
) => {
  try {
    const user = await client.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return Result.err(new UserNotFound());
    }

    return Result.ok(user);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};
