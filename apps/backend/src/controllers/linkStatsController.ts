import { Result } from '@badrap/result';
import { PResult } from 'common';
import { queryLinkStatistics } from '../repository/linkStatsRepository';
import { DateRange } from 'common/types/api/utils';
import { statisticsToKeyMap } from '../utils/reducers';

/**
 * Gets statistics by link id, user id, or date range.
 * @param data
 * @returns
 */
export const getLinkStatistics: (data: {
  linkId?: string;
  userId?: string;
  range?: DateRange;
}) => PResult<{
  impressions: number;
  region: Record<string, number>;
  language: Record<string, number>;
}> = async (data) => {
  try {
    const statisticsResult = await queryLinkStatistics(data);

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
