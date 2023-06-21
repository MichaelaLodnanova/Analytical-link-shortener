import { useMemo } from 'react';

type UseMemoNumStatsProps = {
  stats?: {
    impressions: number;
    conversions: number;
    skips: number;
    conversionRate: number;
  };
};

export default function useMemoNumStats({ stats }: UseMemoNumStatsProps) {
  const todaysStatsData = useMemo(() => {
    if (!stats) {
      return [
        {
          label: 'Impressions',
          count: 0,
        },
        {
          label: 'Conversions',
          count: 0,
        },
        {
          label: 'Skips',
          count: 0,
        },
        {
          label: 'Conv. Rate',
          count: 0,
        },
      ];
    }

    return [
      {
        label: 'Impressions',
        count: stats.impressions,
      },
      {
        label: 'Conversions',
        count: stats.conversions,
      },
      {
        label: 'Skips',
        count: stats.skips,
      },
      {
        label: 'Conv. Rate',
        count: Math.round(stats.conversionRate * 1000) / 10 + '%',
      },
    ];
  }, [stats]);

  return todaysStatsData;
}
