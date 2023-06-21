import { Box, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import { addMonths } from 'date-fns';
import { useMemo, useState } from 'react';

import TimelineChart from '../../common/charts/TimelineChart';
import { useLinkStats } from '../../hooks/useLinkStats';
import RangeDate from './components/RangeDate';
import StatsRow from './components/StatsRow';
import { useAdStats } from '../../hooks/useAdStats';
import useMemoNumStats from './hook/useMemoNumStats';

const today = new Date();
export const AdminDashboard = () => {
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

  const {
    stats: linkStats,
    isFetching: linkIsFetching,
    isLoading: linkIsLoading,
  } = useLinkStats(params);
  const {
    stats: adStats,
    isFetching: adIsFetching,
    isLoading: adIsLoading,
  } = useAdStats(params);

  const todaysAdStatsData = useMemoNumStats(
    useMemo(() => ({ stats: adStats?.data.today }), [adStats?.data])
  );

  const realtimeAdStatsData = useMemoNumStats(
    useMemo(() => ({ stats: adStats?.data }), [adStats?.data])
  );

  const todaysStatsData = useMemo(() => {
    if (!linkStats?.data) {
      return [{ label: 'Link Visits', count: 0 }, ...todaysAdStatsData];
    }

    return [
      {
        label: 'Link Visits',
        count: linkStats?.data.today.impressions,
      },
      ...todaysAdStatsData,
    ];
  }, [linkStats?.data, todaysAdStatsData]);

  const realtimeStatsData = useMemo(() => {
    if (!linkStats?.data) {
      return [{ label: 'Link Visits', count: 0 }, ...realtimeAdStatsData];
    }

    return [
      { label: 'Link Visits', count: linkStats?.data.impressions },
      ...realtimeAdStatsData,
    ];
  }, [linkStats?.data, realtimeAdStatsData]);

  return (
    <Box>
      <StatsRow
        label="Today's Stats"
        isLoading={adIsLoading || linkIsLoading}
        data={todaysStatsData}
      />
      <Divider mt="8" mb="8" />

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
        justifyContent={'flex-end'}
      >
        <span></span>
        <span></span>
        <RangeDate
          isLoading={adIsFetching || linkIsFetching}
          onChange={setSelectedDates}
        />
      </SimpleGrid>
      <Heading size="lg">Overall Link Statistics</Heading>
      <Box mt="4">
        <StatsRow
          isLoading={adIsLoading || linkIsLoading}
          data={realtimeStatsData}
        />
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 1, lg: 2, xl: 2 }} spacing="8" mt="4">
        <TimelineChart
          data={linkStats?.data.impressionsTimeline}
          label="Visits"
          isDate
        />
        <TimelineChart data={linkStats?.data.language} label="Language" />
        <TimelineChart data={linkStats?.data.region} label="Region" />
      </SimpleGrid>
      <Heading size="lg" mt="8">
        Overall Advertisement Statistics
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 1, lg: 2, xl: 2 }} spacing="8" mt="4">
        <TimelineChart
          data={adStats?.data.impressionsTimeline}
          isDate
          label="Impressions"
        />
        <TimelineChart
          data={adStats?.data.conversionTimeline}
          isDate
          label="Conversions"
        />
        <TimelineChart
          data={adStats?.data.skipsTimeline}
          isDate
          label="Skips"
        />
        <TimelineChart data={adStats?.data.language} label="Language" />
        <TimelineChart data={adStats?.data.region} label="Region" />
      </SimpleGrid>
    </Box>
  );
};
