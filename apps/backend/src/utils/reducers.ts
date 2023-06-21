import { KeysMatching, TimelineEntry } from 'common';
import { TimelineRawQueryData } from '../types/query';
import { formatISO } from 'date-fns';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const statisticsToKeyMap: <T extends Record<string, any>>(
  stats: T[],
  key: KeysMatching<T, string>
) => TimelineEntry[] = (stats, key) => {
  const temp = stats.reduce((acc, curr) => {
    if (curr[key] in acc) {
      acc[curr[key]] += 1;
    } else {
      acc[curr[key]] = 1;
    }

    return acc;
  }, {} as Record<string, number>);

  const result: TimelineEntry[] = [];

  for (const [key, value] of Object.entries(temp)) {
    result.push({
      date: key,
      value,
    });
  }

  return result;
};

/**
 * Converts the raw timeline data to a Record<string, number> object.
 * Where the key is datetime in ISO format and the value is the count.
 * @returns A Record<string, number> object.
 */
export const postProcessTimelineData = (
  data: TimelineRawQueryData
): TimelineEntry[] => {
  const result: TimelineEntry[] = [];
  data.forEach((item) => {
    if (item.summarydate == null) {
      return;
    }
    result.push({ date: formatISO(item.summarydate), value: item.count });
  });
  return result;
};
