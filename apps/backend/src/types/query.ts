import { PResult, TimelineEntry } from 'common';
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

export type TimelineQueryFilters<T extends object> = T & {
  groupByKey: 'clickedAt' | 'skippedAt' | 'createdAt';
};

export type TimelineRawQueryData = { count: number; summarydate: Date }[];

export type AdStatsNumQuery = (
  filter: AdvertisementQueryFilters
) => PResult<number>;

export type AdStatsTimelineQuery = (
  filter: AdvertisementQueryFilters
) => PResult<TimelineEntry[]>;

export type LinkStatsTimelineQuery = (
  filter: LinkQueryFilters
) => PResult<TimelineEntry[]>;
