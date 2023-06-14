import { type DateRange } from './utils';
import { SuccessResponse } from 'common/types/api/utils';

export type RequestStatsLinkGet = DateRange & {
  id?: string;
};

export type ResponseStatsLinkGetData = {
  impressions: number;
  /**
   * Region code mapped to number of impressions
   */
  region: Record<string, number>;
  /**
   * Language mapped to number of impressions
   */
  language: Record<string, number>;
};
export type ResponseStatsLinkGet = SuccessResponse<ResponseStatsLinkGetData>;

export type RequestStatsAdsGet = DateRange & {
  id?: string;
};
