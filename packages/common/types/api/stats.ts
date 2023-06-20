import { type DateRange } from './utils';
import { SuccessResponse } from 'common/types/api/utils';

export type RequestStatsLinkGet = DateRange & {
  id?: string;
};

export type PieChartEntry = {
  key: string;
  value: number;
};

export type ResponseStatsLinkGetData = {
  impressions: number;
  /**
   * Region code mapped to number of impressions
   */
  region: TimelineEntry[];
  /**
   * Language mapped to number of impressions
   */
  language: TimelineEntry[];
};
export type ResponseStatsLinkGet = SuccessResponse<ResponseStatsLinkGetData>;

export type RequestStatsAdsGet = DateRange & {
  id?: string;
};

export type TimelineEntry = {
  date: string;
  value: number;
};

export type ResponseStatsAdsGet = SuccessResponse<{
  /**
   * How many viewed the ad
   */
  impressions: number;
  /**
   * How many people skipped the ad
   */
  skips: number;
  /**
   * How many people clicked the ad after viewing it
   */
  conversions: number;
  /**
   * The percentage of people who clicked the ad after viewing it
   */
  conversionRate: number;
  conversionTimeline: TimelineEntry[];
  impressionsTimeline: TimelineEntry[];
  skipsTimeline: TimelineEntry[];
  /**
   * Region code mapped to number of impressions
   */
  region: TimelineEntry[];
  /**
   * Language mapped to number of impressions
   */
  language: TimelineEntry[];

  today: {
    impressions: number;
    skips: number;
    conversions: number;
    conversionRate: number;
  };
}>;
