import { Result } from '@badrap/result';
import { DeletedRecordError, NonexistentRecordError } from './errors';
import { Prisma, PrismaClient } from 'model';

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
