import { Center, Spinner } from '@chakra-ui/react';
import { TimelineEntry } from 'common';
import { useMemo } from 'react';

import { Linechart } from '.';

type TimelineChartProps = {
  data?: TimelineEntry[];
  label: string;
  isDate?: boolean;
};

export default function TimelineChart({
  isDate,
  label,
  data,
}: TimelineChartProps) {
  const dataMemoized = useMemo(() => {
    if (!data) {
      return undefined;
    }
    return [
      {
        label: label,
        data,
      },
    ];
  }, [data, label]);

  if (!dataMemoized) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return <Linechart data={dataMemoized} isDate={isDate} />;
}
