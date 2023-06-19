import { Result } from '@badrap/result';
import { PResult } from 'common';
import { client, LinkStatistics } from 'model';

import { LinkQueryFilters } from '../types/query';

/**
 * Gets statistics by link id, user id, or date range.
 */
export const queryLinkStatistics: (
  filter: LinkQueryFilters
) => PResult<LinkStatistics[]> = async (filter) => {
  try {
    const statistics = await client.linkStatistics.findMany({
      where: {
        ...(filter.linkId && { linkId: filter.linkId }),
        ...(filter.userId && { link: { createdById: filter.userId } }),
        ...(filter.range && {
          createdAt: { gte: filter.range.from, lte: filter.range.to },
        }),
      },
    });

    return Result.ok(statistics);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};
