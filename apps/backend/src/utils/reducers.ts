import { LinkStatistics } from 'model';

type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

export const statisticsToKeyMap: (
  stats: LinkStatistics[],
  key: KeysMatching<LinkStatistics, string>
) => Record<string, number> = (stats, key) => {
  return stats.reduce((acc, curr) => {
    if (curr[key] in acc) {
      acc[curr[key]] += 1;
    } else {
      acc[curr[key]] = 1;
    }

    return acc;
  }, {} as Record<string, number>);
};
