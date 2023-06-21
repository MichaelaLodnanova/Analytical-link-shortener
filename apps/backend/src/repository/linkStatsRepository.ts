import { Result } from '@badrap/result';
import { PResult } from 'common';
import { client, LinkStatistics, Prisma } from 'model';

import {
  LinkQueryFilters,
  LinkStatsTimelineQuery,
  TimelineQueryFilters,
  TimelineRawQueryData,
} from '../types/query';
import { parseISO } from 'date-fns';
import { postProcessTimelineData } from '../utils/reducers';

/**
 * Generates a where clause for the raw timeline statistics query.
 * @returns A where clause for the raw timeline statistics query.
 */
const generateWhereClause = ({ range, linkId, userId }: LinkQueryFilters) => {
  const whereClause: Prisma.Sql[] = [];

  if (range) {
    whereClause.push(
      Prisma.sql`"LinkStatistics"."createdAt" >= ${parseISO(
        range.from
      )} AND "LinkStatistics"."createdAt" <= ${parseISO(range.to)}`
    );
  }

  if (linkId) {
    whereClause.push(Prisma.sql`"linkId" = ${linkId}`);
  }

  if (userId) {
    whereClause.push(Prisma.sql`"link"."createdById" = ${userId}`);
  }

  return whereClause.length
    ? Prisma.sql`WHERE ${Prisma.join(whereClause, ` AND `)}`
    : Prisma.empty;
};

/**
 * Gets timeline statistics by the given filter
 */
const queryTimelineData: (
  filter: TimelineQueryFilters<LinkQueryFilters>
) => PResult<TimelineRawQueryData> = async (filter) => {
  try {
    let select = Prisma.raw(`DATE_TRUNC('hour', 
    DATE_TRUNC('minute', 
      DATE_TRUNC('second', 
        "LinkStatistics"."${filter.groupByKey}"))) as summaryDate`);

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
              "LinkStatistics"."${filter.groupByKey}")))) as summaryDate`);
    }

    return Result.ok(
      await client.$queryRaw`
        SELECT COUNT("LinkStatistics"."id") as count,  
          ${select}
        FROM "public"."LinkStatistics"
        LEFT JOIN "public"."Link" as "link" ON "link"."id" = "LinkStatistics"."linkId"
        ${generateWhereClause(filter)}
        GROUP BY summaryDate;`
    );
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

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

/**
 * Gets timeline statistics for impressions by the given filter
 * @returns A Record<string, number> object.
 */
export const queryLinkImpressionsTimeline: LinkStatsTimelineQuery = async (
  filter
) => {
  const result = await queryTimelineData({
    ...filter,
    groupByKey: 'createdAt',
  });

  if (result.isErr) {
    return Result.err(result.error);
  }

  return Result.ok(postProcessTimelineData(result.value));
};
