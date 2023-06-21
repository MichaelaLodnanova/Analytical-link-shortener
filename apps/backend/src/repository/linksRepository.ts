import { Result } from '@badrap/result';
import { AnonymizedLink, PResult } from 'common';
import { PaginationSchema } from 'common/validators/paginationZod';
import { client } from 'model';

/**
 * Returns a list of links filtered by the given parameters.
 * @returns A list of links.
 */
export const getLinks: (
  params: PaginationSchema & { userId?: string }
) => PResult<AnonymizedLink[]> = async ({ limit, offset, userId, search }) => {
  try {
    const links = await client.link.findMany({
      where: {
        ...(userId && { createdById: userId }),
        ...(search && {
          OR: [
            { url: { search } },
            { shortId: { search } },
            { url: { contains: search } },
            { shortId: { contains: search } },
          ],
        }),
      },
      select: {
        id: true,
        url: true,
        isAdvertisementEnabled: true,
        shortId: true,
      },
      take: limit,
      skip: offset,
    });
    return Result.ok(links);
  } catch (error) {
    return Result.err(error as Error);
  }
};
