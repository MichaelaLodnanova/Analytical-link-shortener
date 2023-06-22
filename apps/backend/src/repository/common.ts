import { Result } from '@badrap/result';
import {
  AccessRightsError,
  DeletedRecordError,
  NonexistentRecordError,
} from './errors';
import { Prisma, PrismaClient, Role } from 'model';

export type PrismaTransactionHandle = Omit<
  PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;

export type CheckByIdData = {
  id: string;
};

export type CheckByIdWithAccessData = {
  id: string;
  requesterId: string;
};

/**
 * Function which checks if the link exists and is not deleted.
 *
 * @param data - object containing id of the link
 * @param tx transaction handle
 * @throws on Prisma errors
 * @returns - `Result.ok({})` on success
 *          - `Result.err(_)` on failure
 *            - NonexistentRecordError('The specified link does not exist!')
 *            - DeletedRecordError('The specified link has already been deleted!')
 */
export const checkLink = async (
  data: CheckByIdData,
  tx: PrismaTransactionHandle
): Promise<Result<unknown>> => {
  const link = await tx.link.findUnique({
    where: {
      id: data.id,
    },
  });

  if (link === null) {
    return Result.err(
      new NonexistentRecordError('The specified link does not exist!')
    );
  }

  if (link.deletedAt !== null) {
    return Result.err(
      new DeletedRecordError('The specified link has already been deleted!')
    );
  }

  return Result.ok({});
};

/**
 * Function which checks if the link exists and is not deleted.
 *
 * @param data - object containing id of the link
 * @param tx transaction handle
 * @throws on Prisma errors
 * @returns - `Result.ok({})` on success
 *          - `Result.err(_)` on failure
 *            - NonexistentRecordError('The specified link does not exist!')
 *            - DeletedRecordError('The specified link has already been deleted!')
 */
export const checkLinkShortId = async (
  data: CheckByIdData,
  tx: PrismaTransactionHandle
): Promise<Result<unknown>> => {
  const link = await tx.link.findFirst({
    where: {
      shortId: data.id,
    },
  });

  if (link === null) {
    return Result.err(
      new NonexistentRecordError('The specified link does not exist!')
    );
  }

  if (link.deletedAt !== null) {
    return Result.err(
      new DeletedRecordError('The specified link has already been deleted!')
    );
  }

  return Result.ok({});
};

/**
 * Function which checks if the link exists, it is not deleted and the requester has
 * the request rights.
 *
 * @param data - object containing id of the link and the requester id
 * @param tx transaction handle
 * @throws on Prisma errors
 * @returns - `Result.ok({})` on success
 *          - `Result.err(_)` on failure
 *            - NonexistentRecordError('The specified link does not exist!')
 *            - DeletedRecordError('The specified link has already been deleted!')
 *            - AccessRightsError('Only admin and owner can update the link')
 */
export const checkLinkWithAccess = async (
  data: CheckByIdWithAccessData,
  tx: PrismaTransactionHandle
): Promise<Result<unknown>> => {
  const link = await tx.link.findUnique({
    where: {
      id: data.id,
    },
  });

  if (link === null) {
    return Result.err(
      new NonexistentRecordError('The specified link does not exist!')
    );
  }

  if (link.deletedAt !== null) {
    return Result.err(
      new DeletedRecordError('The specified link has already been deleted!')
    );
  }

  // we pressume that requester exists
  const requester = await tx.user.findUniqueOrThrow({
    where: {
      id: data.requesterId,
    },
  });

  if (data.requesterId !== link.createdById && requester.role !== Role.ADMIN) {
    return Result.err(
      new AccessRightsError('Only admin and owner can update the link')
    );
  }

  return Result.ok({});
};

/**
 * Function which checks if the user exists and is not deleted.
 *
 * @param data - object containing id of the link
 * @param tx transaction handle
 * @throws on Prisma errors
 * @returns - `Result.ok({})` on success
 *          - `Result.err(_)` on failure
 *            - NonexistentRecordError('The specified user does not exist!')
 *            - DeletedRecordError('The specified user has already been deleted!')
 */
export const checkUser = async (
  data: CheckByIdData,
  tx: PrismaTransactionHandle
): Promise<Result<unknown>> => {
  const user = await tx.user.findUnique({
    where: {
      id: data.id,
    },
  });

  if (user === null) {
    return Result.err(
      new NonexistentRecordError('The specified user does not exist!')
    );
  }

  if (user.deletedAt !== null) {
    return Result.err(
      new DeletedRecordError('The specified user has already been deleted!')
    );
  }

  return Result.ok({});
};

/**
 * Function which checks if the advertisement exists.
 *
 * @param data - object containing id of the advertisement and the requester id
 * @param tx transaction handle
 * @throws on Prisma errors
 * @returns - `Result.ok({})` on success
 *          - `Result.err(_)` on failure
 *            - NonexistentRecordError('The specified advertisement does not exist!')
 *            - DeletedRecordError('The specified advertisement has already been deleted!')
 */
export const checkAdvertisement = async (
  data: CheckByIdData,
  tx: PrismaTransactionHandle
): Promise<Result<unknown>> => {
  const advertisement = await tx.advertisement.findUnique({
    where: {
      id: data.id,
    },
  });

  if (advertisement === null) {
    return Result.err(
      new NonexistentRecordError('The specified advertisement does not exist!')
    );
  }

  if (advertisement.deletedAt !== null) {
    return Result.err(
      new DeletedRecordError(
        'The specified advertisement has already been deleted!'
      )
    );
  }

  return Result.ok({});
};

/**
 * Function which checks if the advertisement exists, it is not deleted and the requester has
 * the request rights.
 *
 * @param data - object containing id of the advertisement and the requester id
 * @param tx transaction handle
 * @throws on Prisma errors
 * @returns - `Result.ok({})` on success
 *          - `Result.err(_)` on failure
 *            - NonexistentRecordError('The specified advertisement does not exist!')
 *            - DeletedRecordError('The specified advertisement has already been deleted!')
 *            - AccessRightsError('Only admin and owner can update the advertisement')
 */
export const checkAdvertisementWithAccess = async (
  data: CheckByIdWithAccessData,
  tx: PrismaTransactionHandle
): Promise<Result<unknown>> => {
  const advertisement = await tx.advertisement.findUnique({
    where: {
      id: data.id,
    },
  });

  if (advertisement === null) {
    return Result.err(
      new NonexistentRecordError('The specified advertisement does not exist!')
    );
  }

  if (advertisement.deletedAt !== null) {
    return Result.err(
      new DeletedRecordError(
        'The specified advertisement has already been deleted!'
      )
    );
  }

  // we pressume that requester exists
  const requester = await tx.user.findUniqueOrThrow({
    where: {
      id: data.requesterId,
    },
  });

  if (
    data.requesterId !== advertisement.createdById &&
    requester.role !== Role.ADMIN
  ) {
    return Result.err(
      new AccessRightsError('Only admin and owner can access the advertisement')
    );
  }

  return Result.ok({});
};
