import { Result } from '@badrap/result';
import {
  PResult,
  OptionalAdvertisementStatistics,
  TimelineEntry,
} from 'common';
import { startOfToday, startOfTomorrow } from 'date-fns';

import {
  createNewAdvertisementStatistics,
  queryAdvertisementConversions,
  queryAdvertisementConversionsTimeline,
  queryAdvertisementImpressions,
  queryAdvertisementImpressionsTimeline,
  queryAdvertisementSkips,
  queryAdvertisementSkipsTimeline,
  queryAdvertisementStatisticsRegionLanguage,
  updateAdvertisementStatisticsById,
} from '../repository/advertisementStatsRepository';
import { AdvertisementQueryFilters } from '../types/query';
import { statisticsToKeyMap } from '../utils/reducers';
import {
  UpdateAdvertisementStatisticsData,
  CreateAdvertisementStatisticsData,
} from '../types/advertisementStats';

export const getAdvertisementNumericalStatistics: (
  data: AdvertisementQueryFilters
) => PResult<{
  impressions: number;
  conversions: number;
  skips: number;
  conversionRate: number;
}> = async (data) => {
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

  return Result.ok({
    impressions: impressionsResult.value,
    conversions: conversionsResult.value,
    skips: skipsResult.value,
    conversionRate: conversionsResult.value / impressionsResult.value || 0,
  });
};

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
  conversionTimeline: TimelineEntry[];
  impressionsTimeline: TimelineEntry[];
  skipsTimeline: TimelineEntry[];
  region: TimelineEntry[];
  language: TimelineEntry[];
  today: {
    impressions: number;
    conversions: number;
    skips: number;
    conversionRate: number;
  };
}> = async (data) => {
  try {
    const numerical = await getAdvertisementNumericalStatistics(data);
    if (numerical.isErr) {
      return Result.err(numerical.error);
    }

    const numericalToday = await getAdvertisementNumericalStatistics({
      ...data,
      range: {
        from: startOfToday().toISOString(),
        to: startOfTomorrow().toISOString(),
      },
    });
    if (numericalToday.isErr) {
      return Result.err(numericalToday.error);
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

    const statistics = await queryAdvertisementStatisticsRegionLanguage(data);
    if (statistics.isErr) {
      return Result.err(statistics.error);
    }

    return Result.ok({
      ...numerical.value,
      conversionTimeline: conversionTimeline.value,
      impressionsTimeline: impressionsTimeline.value,
      skipsTimeline: skipsTimeline.value,
      region: statisticsToKeyMap(statistics.value, 'region'),
      language: statisticsToKeyMap(statistics.value, 'language'),
      today: numericalToday.value,
    });
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

export const createAdvertisementStatistics: (
  data: CreateAdvertisementStatisticsData
) => PResult<OptionalAdvertisementStatistics> = async (data) => {
  const stats = await createNewAdvertisementStatistics(data);

  return stats;
};

export const updateAdvertisementStatistics: (
  data: UpdateAdvertisementStatisticsData
) => PResult<OptionalAdvertisementStatistics> = async (data) => {
  const stats = await updateAdvertisementStatisticsById(data);

  return stats;
};
