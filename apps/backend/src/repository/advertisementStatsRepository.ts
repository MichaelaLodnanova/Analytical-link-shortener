import { Result } from '@badrap/result';
import { PResult, ResponseStatsAdsPostData } from 'common';
import { parseISO } from 'date-fns';
import { client, Prisma } from 'model';

import {
  AdStatsNumQuery,
  AdStatsTimelineQuery,
  AdvertisementQueryFilters,
  TimelineQueryFilters,
  TimelineRawQueryData,
} from '../types/query';
import { postProcessTimelineData } from '../utils/reducers';
import { PostAdvertisementStatisticsData } from '../types/advertisementStats';
import { checkAdvertisement, checkLink } from './common';

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
  filter: TimelineQueryFilters<AdvertisementQueryFilters>
) => PResult<TimelineRawQueryData> = async (filter) => {
  try {
    let select = Prisma.raw(`DATE_TRUNC('hour', 
    DATE_TRUNC('minute', 
      DATE_TRUNC('second', 
        "AdvertisementStatistics"."${filter.groupByKey}"))) as summaryDate`);

    let days = 7;
    if (filter.range) {
      const from = parseISO(filter.range.from);
      const to = parseISO(filter.range.to);
      const diff = Math.abs(to.getTime() - from.getTime());
      days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    if (days >= 7) {
      select = Prisma.raw(`
      DATE_TRUNC('day', 
        DATE_TRUNC('hour', 
          DATE_TRUNC('minute', 
            DATE_TRUNC('second', 
              "AdvertisementStatistics"."${filter.groupByKey}")))) as summaryDate`);
    }

    return Result.ok(
      await client.$queryRaw`
        SELECT COUNT("AdvertisementStatistics"."id") as count,  
          ${select}
        FROM "public"."AdvertisementStatistics"
        LEFT JOIN "public"."Advertisement" as "ad" ON "ad"."id" = "AdvertisementStatistics"."advertisementId"
        ${generateWhereClause(filter)}
        GROUP BY summaryDate
        ORDER BY summaryDate ASC;`
    );
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
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

export const queryAdvertisementStatisticsRegionLanguage: (
  filter: AdvertisementQueryFilters
) => PResult<{ region: string; language: string }[]> = async (filter) => {
  try {
    const statistics = await client.advertisementStatistics.findMany({
      where: {
        ...getQueryFilters(filter),
      },
      select: {
        region: true,
        language: true,
      },
    });

    return Result.ok(statistics);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

const getUpsertQueryFilters = (filter: PostAdvertisementStatisticsData) => ({
  advertisementId: filter.advertisementId,
  linkId: filter.linkId,
  skippedAt: filter.skippedAt ? parseISO(filter.skippedAt) : undefined,
  clickedAt: filter.clickedAt ? parseISO(filter.clickedAt) : undefined,
  region: filter.region,
  language: filter.language,
});

export const createNewAdvertisementStatistics: (
  data: PostAdvertisementStatisticsData
) => PResult<ResponseStatsAdsPostData> = async (data) => {
  try {
    // check that link exists
    const linkCheck = await checkLink({ id: data.linkId }, client);

    if (linkCheck.isErr) {
      return Result.err(linkCheck.error);
    }

    // check that ad exists
    const advertisementCheck = await checkAdvertisement(
      { id: data.advertisementId },
      client
    );

    if (advertisementCheck.isErr) {
      return Result.err(advertisementCheck.error);
    }

    const statistics = await client.advertisementStatistics.create({
      data: {
        ...getUpsertQueryFilters(data),
      },
      select: {
        id: true,
        advertisementId: true,
        linkId: true,
        region: true,
        language: true,
        skippedAt: true,
        clickedAt: true,
      },
    });

    const convertedStats = {
      id: statistics.id,
      advertisementId: statistics.advertisementId,
      linkId: statistics.linkId,
      skippedAt:
        statistics.skippedAt !== null
          ? statistics.skippedAt.toISOString()
          : undefined,
      clickedAt:
        statistics.clickedAt !== null
          ? statistics.clickedAt.toISOString()
          : undefined,
      region: statistics.region,
      language: statistics.language,
    };

    return Result.ok(convertedStats);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};
