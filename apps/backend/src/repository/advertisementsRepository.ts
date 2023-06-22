import { Result } from '@badrap/result';
import { AnonymizedAdvertisement, PResult } from 'common';
import { PaginationSchema } from 'common/validators/paginationZod';
import { client } from 'model';

/**
 * Returns a list of links filtered by the given parameters.
 * @returns A list of links.
 */
export const getAdvertisements: (
  params: PaginationSchema & { userId?: string }
) => PResult<AnonymizedAdvertisement[]> = async ({
  limit,
  offset,
  userId,
  search,
}) => {
  try {
    const links = await client.advertisement.findMany({
      where: {
        ...(userId && { createdById: userId }),
        ...(search && {
          OR: [
            { adUrl: { search } },
            { forwardUrl: { search } },
            { title: { search } },
            { adUrl: { contains: search } },
            { forwardUrl: { contains: search } },
            { title: { contains: search } },
          ],
        }),
      },
      select: {
        id: true,
        title: true,
        adUrl: true,
        forwardUrl: true,
      },
      take: limit,
      skip: offset,
    });
    return Result.ok(links);
  } catch (error) {
    return Result.err(error as Error);
  }
};
