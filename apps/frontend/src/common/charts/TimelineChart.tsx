import { KeysMatching, ResponseStatsAdsGet, TimelineEntry } from 'common';
import { useMemo } from 'react';

import { Linechart } from '.';
import { useAdStats } from '../../hooks/useAdStats';
import { Center, Spinner } from '@chakra-ui/react';

type TimelineChartProps = {
  from: string;
  to: string;
  id?: string;
  statType: KeysMatching<ResponseStatsAdsGet['data'], TimelineEntry[]>;
  label: string;
  isDate?: boolean;
};

export default function TimelineChart(props: TimelineChartProps) {
  const params = useMemo(() => {
    return {
      from: props.from,
      to: props.to,
      id: props.id,
    };
  }, [props.from, props.to, props.id]);
  const { stats, isLoading } = useAdStats(params);

  const data = useMemo(() => {
    if (stats) {
      return [
        {
          label: props.label,
          data: stats.data[props.statType],
        },
      ];
    }
    return [
      {
        label: props.label,
        data: [],
      },
    ];
  }, [stats, props.label, props.statType]);

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return <Linechart data={data} isDate={props.isDate} />;
}
