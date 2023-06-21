import { Box, Center, Heading } from '@chakra-ui/react';
import { TimelineEntry } from 'common';
import { parseISO } from 'date-fns';
import { useMemo } from 'react';
import { AxisLinearOptions, Chart } from 'react-charts';

type LinechartProps = {
  data: {
    label: string;
    data: TimelineEntry[];
  }[];
  isDate?: boolean;
};

export const Linechart = ({ data, isDate }: LinechartProps) => {
  const primaryAxis = useMemo(
    (): AxisLinearOptions<TimelineEntry> => ({
      getValue: ({ date }) =>
        isDate
          ? (parseISO(date) as unknown as number)
          : (date as unknown as number),
    }),
    [isDate]
  );
  const secondaryAxes = useMemo(
    (): AxisLinearOptions<TimelineEntry>[] => [
      {
        getValue: ({ value }) => value,
        min: 0,
      },
    ],
    []
  );

  return (
    <Box height="64" width="100%">
      <Heading size="sm" mb="3">
        {data[0]?.label}
      </Heading>
      {data[0]?.data.length ? (
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      ) : (
        <Center height="100%">
          <Heading size="sm">No data :(</Heading>
        </Center>
      )}
    </Box>
  );
};
