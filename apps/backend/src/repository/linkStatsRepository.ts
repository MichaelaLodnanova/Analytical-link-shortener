import { Result } from '@badrap/result';
import { PResult } from 'common';
import { DateRange } from 'common/types/api/utils';
import { client, LinkStatistics } from 'model';

/**
 * Gets statistics by link id, user id, or date range.
 */
export const queryLinkStatistics: (data: {
  linkId?: string;
  userId?: string;
  range?: DateRange;
}) => PResult<LinkStatistics[]> = async (data) => {
  try {
    const statistics = await client.linkStatistics.findMany({
      where: {
        ...(data.linkId && { linkId: data.linkId }),
        ...(data.userId && { link: { createdById: data.userId } }),
        ...(data.range && {
          createdAt: { gte: data.range.from, lte: data.range.to },
        }),
      },
    });

    return Result.ok(statistics);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};
