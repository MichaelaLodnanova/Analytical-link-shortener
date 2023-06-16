import { PResult } from 'common';
import { DateRange } from 'common/types/api/utils';

export type AdvertisementQueryFilters = {
  adId?: string;
  userId?: string;
  range?: DateRange;
};
export type LinkQueryFilters = {
  linkId?: string;
  userId?: string;
  range?: DateRange;
};

export type TimelineQueryFilters = AdvertisementQueryFilters & {
  groupByKey: 'clickedAt' | 'skippedAt' | 'createdAt';
};

export type TimelineRawQueryData = { count: number; summarydate: Date }[];

export type AdStatsNumQuery = (
  filter: AdvertisementQueryFilters
) => PResult<number>;

export type AdStatsTimelineQuery = (
  filter: AdvertisementQueryFilters
) => PResult<Record<string, number>>;
