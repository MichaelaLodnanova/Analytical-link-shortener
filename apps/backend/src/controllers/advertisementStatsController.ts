import { Result } from '@badrap/result';
import { PResult } from 'common';

import {
  queryAdvertisementConversions,
  queryAdvertisementConversionsTimeline,
  queryAdvertisementImpressions,
  queryAdvertisementImpressionsTimeline,
  queryAdvertisementSkips,
  queryAdvertisementSkipsTimeline,
} from '../repository/advertisementStatsRepository';
import { AdvertisementQueryFilters } from '../types/query';

/**
 * Gets statistics by link id, user id, or date range.
 * @param data
 * @returns
 */
export const getAdvertisementStatistics: (
  data: AdvertisementQueryFilters
) => PResult<{
  impressions: number;
  conversions: number;
  skips: number;
  conversionRate: number;
  conversionTimeline: Record<string, number>;
  impressionsTimeline: Record<string, number>;
  skipsTimeline: Record<string, number>;
}> = async (data) => {
  try {
    const conversionsResult = await queryAdvertisementConversions(data);

    if (conversionsResult.isErr) {
      return Result.err(conversionsResult.error);
    }

    const impressionsResult = await queryAdvertisementImpressions(data);

    if (impressionsResult.isErr) {
      return Result.err(impressionsResult.error);
    }

    const skipsResult = await queryAdvertisementSkips(data);

    if (skipsResult.isErr) {
      return Result.err(skipsResult.error);
    }

    const conversionTimeline = await queryAdvertisementConversionsTimeline(
      data
    );

    if (conversionTimeline.isErr) {
      return Result.err(conversionTimeline.error);
    }

    const impressionsTimeline = await queryAdvertisementImpressionsTimeline(
      data
    );

    if (impressionsTimeline.isErr) {
      return Result.err(impressionsTimeline.error);
    }

    const skipsTimeline = await queryAdvertisementSkipsTimeline(data);

    if (skipsTimeline.isErr) {
      return Result.err(skipsTimeline.error);
    }

    return Result.ok({
      impressions: impressionsResult.value,
      conversions: conversionsResult.value,
      skips: skipsResult.value,
      conversionRate: conversionsResult.value / impressionsResult.value || 0,
      conversionTimeline: conversionTimeline.value,
      impressionsTimeline: impressionsTimeline.value,
      skipsTimeline: skipsTimeline.value,
    });
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};
