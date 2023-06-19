import { Result } from '@badrap/result';
import { PResult, TimelineEntry } from 'common';
import { formatISO, parseISO } from 'date-fns';
import { client, Prisma } from 'model';

import {
  AdStatsNumQuery,
  AdStatsTimelineQuery,
  AdvertisementQueryFilters,
  TimelineQueryFilters,
  TimelineRawQueryData,
} from '../types/query';

/**
 * Generates a where clause for the raw timeline statistics query.
 * @returns A where clause for the raw timeline statistics query.
 */
const generateWhereClause = ({
  range,
  adId,
  userId,
}: AdvertisementQueryFilters) => {
  const whereClause: Prisma.Sql[] = [];

  if (range) {
    whereClause.push(
      Prisma.sql`"AdvertisementStatistics"."createdAt" >= ${parseISO(
        range.from
      )} AND "AdvertisementStatistics"."createdAt" <= ${parseISO(range.to)}`
    );
  }

  if (adId) {
    whereClause.push(Prisma.sql`"advertisementId" = ${adId}`);
  }

  if (userId) {
    whereClause.push(Prisma.sql`"ad"."createdById" = ${userId}`);
  }

  return whereClause.length
    ? Prisma.sql`WHERE ${Prisma.join(whereClause, ` AND `)}`
    : Prisma.empty;
};

/**
 * Generates a where clause for the prisma query.
 * @returns A where clause for the prisma query.
 */
const getQueryFilters = (filter: AdvertisementQueryFilters) => ({
  ...(filter.adId && { advertisementId: filter.adId }),
  ...(filter.userId && { advertisement: { createdById: filter.userId } }),
  ...(filter.range && {
    createdAt: { gte: filter.range.from, lte: filter.range.to },
  }),
});

/**
 * Return number of impressions for a given filter
 * @returns Number of impressions
 */
export const queryAdvertisementImpressions: AdStatsNumQuery = async (
  filter
) => {
  try {
    const statistics = await client.advertisementStatistics.count({
      where: {
        ...getQueryFilters(filter),
      },
    });
    return Result.ok(statistics);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

/**
 * Return number of skips for a given filter
 * @returns Number of skips
 */
export const queryAdvertisementSkips: AdStatsNumQuery = async (filter) => {
  try {
    const statistics = await client.advertisementStatistics.count({
      where: {
        ...getQueryFilters(filter),
        skippedAt: { not: null },
      },
    });
    return Result.ok(statistics);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

/**
 * Return number of conversions for a given filter
 * @returns Number of conversions
 */
export const queryAdvertisementConversions: AdStatsNumQuery = async (
  filter
) => {
  try {
    const statistics = await client.advertisementStatistics.count({
      where: {
        ...getQueryFilters(filter),
        clickedAt: { not: null },
      },
    });
    return Result.ok(statistics);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

/**
 * Gets timeline statistics by the given filter
 */
const queryTimelineData: (
  filter: TimelineQueryFilters
) => PResult<TimelineRawQueryData> = async (filter) => {
  try {
    return Result.ok(
      await client.$queryRaw`
        SELECT COUNT("AdvertisementStatistics"."id") as count,  
          DATE_TRUNC('hour', 
            DATE_TRUNC('minute', 
              DATE_TRUNC('second', 
                "AdvertisementStatistics"."${Prisma.raw(
                  filter.groupByKey
                )}"))) as summaryDate 
        FROM "public"."AdvertisementStatistics"
        LEFT JOIN "public"."Advertisement" as "ad" ON "ad"."id" = "AdvertisementStatistics"."advertisementId"
        ${generateWhereClause(filter)}
        GROUP BY summaryDate;`
    );
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

/**
 * Converts the raw timeline data to a Record<string, number> object.
 * Where the key is datetime in ISO format and the value is the count.
 * @returns A Record<string, number> object.
 */
const postProcessTimelineData = (
  data: TimelineRawQueryData
): TimelineEntry[] => {
  const result: TimelineEntry[] = [];
  data.forEach((item) => {
    if (item.summarydate == null) {
      return;
    }
    result.push({ date: formatISO(item.summarydate), value: item.count });
  });
  return result;
};

/**
 * Gets timeline statistics for conversions by the given filter
 * @returns A Record<string, number> object.
 */
export const queryAdvertisementConversionsTimeline: AdStatsTimelineQuery =
  async (filter) => {
    const result = await queryTimelineData({
      ...filter,
      groupByKey: 'clickedAt',
    });

    if (result.isErr) {
      return Result.err(result.error);
    }

    return Result.ok(postProcessTimelineData(result.value));
  };

/**
 * Gets timeline statistics for impressions by the given filter
 * @returns A Record<string, number> object.
 */
export const queryAdvertisementImpressionsTimeline: AdStatsTimelineQuery =
  async (filter) => {
    const result = await queryTimelineData({
      ...filter,
      groupByKey: 'createdAt',
    });

    if (result.isErr) {
      return Result.err(result.error);
    }

    return Result.ok(postProcessTimelineData(result.value));
  };

/**
 * Gets timeline statistics for skips by the given filter
 * @returns A Record<string, number> object.
 */
export const queryAdvertisementSkipsTimeline: AdStatsTimelineQuery = async (
  filter
) => {
  const result = await queryTimelineData({
    ...filter,
    groupByKey: 'skippedAt',
  });

  if (result.isErr) {
    return Result.err(result.error);
  }

  return Result.ok(postProcessTimelineData(result.value));
};
