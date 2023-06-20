import { KeysMatching, TimelineEntry } from 'common';

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
