import { Result } from '@badrap/result';
import { PResult, TimelineEntry } from 'common';

import {
  queryLinkImpressionsTimeline,
  queryLinkStatistics,
} from '../repository/linkStatsRepository';
import { LinkQueryFilters } from '../types/query';
import { statisticsToKeyMap } from '../utils/reducers';
import { startOfToday, startOfTomorrow } from 'date-fns';

/**
 * Gets statistics by link id, user id, or date range.
 * @param filter
 * @returns
 */
export const getLinkStatistics: (filter: LinkQueryFilters) => PResult<{
  impressions: number;
  impressionsTimeline: TimelineEntry[];
  region: TimelineEntry[];
  language: TimelineEntry[];
  today: {
    impressions: number;
  };
}> = async (filter) => {
  try {
    const statisticsResult = await queryLinkStatistics(filter);

    if (statisticsResult.isErr) {
      return Result.err(statisticsResult.error);
    }

    const todayStatisticsResult = await queryLinkStatistics({
      ...filter,
      range: {
        from: startOfToday().toISOString(),
        to: startOfTomorrow().toISOString(),
      },
    });

    if (todayStatisticsResult.isErr) {
      return Result.err(todayStatisticsResult.error);
    }

    const impressionsTimelineResult = await queryLinkImpressionsTimeline(
      filter
    );

    if (impressionsTimelineResult.isErr) {
      return Result.err(impressionsTimelineResult.error);
    }

    const todayStatistics = todayStatisticsResult.value;
    const statistics = statisticsResult.value;

    const impressions = statistics.length;
    const region = statisticsToKeyMap(statistics, 'region');
    const language = statisticsToKeyMap(statistics, 'language');

    return Result.ok({
      impressions,
      region,
      language,
      impressionsTimeline: impressionsTimelineResult.value,
      today: {
        impressions: todayStatistics.length,
      },
    });
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};
