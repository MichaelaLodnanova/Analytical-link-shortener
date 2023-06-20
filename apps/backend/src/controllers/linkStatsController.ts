import { Result } from '@badrap/result';
import { PResult, TimelineEntry } from 'common';

import { queryLinkStatistics } from '../repository/linkStatsRepository';
import { LinkQueryFilters } from '../types/query';
import { statisticsToKeyMap } from '../utils/reducers';

/**
 * Gets statistics by link id, user id, or date range.
 * @param filter
 * @returns
 */
export const getLinkStatistics: (filter: LinkQueryFilters) => PResult<{
  impressions: number;
  region: TimelineEntry[];
  language: TimelineEntry[];
}> = async (filter) => {
  try {
    const statisticsResult = await queryLinkStatistics(filter);

    if (statisticsResult.isErr) {
      return Result.err(statisticsResult.error);
    }

    const statistics = statisticsResult.value;

    const impressions = statistics.length;
    const region = statisticsToKeyMap(statistics, 'region');
    const language = statisticsToKeyMap(statistics, 'language');

    return Result.ok({
      impressions,
      region,
      language,
    });
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};
