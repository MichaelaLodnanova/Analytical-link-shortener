import { Box, Divider, SimpleGrid } from '@chakra-ui/react';
import { addMonths } from 'date-fns';
import { useMemo, useState } from 'react';

import TimelineChart from '../../common/charts/TimelineChart';
import { useAdStats } from '../../hooks/useAdStats';
import RangeDate from './components/RangeDate';
import StatsRow from './components/StatsRow';
import useMemoNumStats from './hook/useMemoNumStats';

const today = new Date();
export const AdvertiserDashboard = () => {
  const [selectedDates, setSelectedDates] = useState<[string, string]>([
    addMonths(today, -1).toISOString(),
    today.toISOString(),
  ]);

  const params = useMemo(() => {
    return {
      from: selectedDates[0],
      to: selectedDates[1],
    };
  }, [selectedDates]);

  const { stats, isFetching, isLoading } = useAdStats(params);

  const todaysStatsData = useMemoNumStats(
    useMemo(() => ({ stats: stats?.data.today }), [stats?.data])
  );

  const realtimeStatsData = useMemoNumStats(
    useMemo(() => ({ stats: stats?.data }), [stats?.data])
  );

  return (
    <Box>
      <StatsRow
        label="Today's Stats"
        isLoading={isLoading}
        data={todaysStatsData}
      />
      <Divider mt="8" mb="8" />

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
        justifyContent={'flex-end'}
      >
        <span></span>
        <span></span>
        <RangeDate isLoading={isFetching} onChange={setSelectedDates} />
      </SimpleGrid>
      <Box mt="4">
        <StatsRow isLoading={isLoading} data={realtimeStatsData} />
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 1, lg: 2, xl: 2 }} spacing="8" mt="4">
        <TimelineChart
          data={stats?.data.impressionsTimeline}
          isDate
          label="Impressions"
        />
        <TimelineChart
          data={stats?.data.conversionTimeline}
          isDate
          label="Conversions"
        />
        <TimelineChart data={stats?.data.skipsTimeline} isDate label="Skips" />
        <TimelineChart data={stats?.data.language} label="Language" />
        <TimelineChart data={stats?.data.region} label="Region" />
      </SimpleGrid>
    </Box>
  );
};
