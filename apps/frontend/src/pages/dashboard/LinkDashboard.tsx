import { Box, Divider, SimpleGrid } from '@chakra-ui/react';
import { addMonths } from 'date-fns';
import { useMemo, useState } from 'react';

import TimelineChart from '../../common/charts/TimelineChart';
import { useLinkStats } from '../../hooks/useLinkStats';
import RangeDate from './components/RangeDate';
import StatsRow from './components/StatsRow';

type LinkDashboardProps = {
  linkId?: string;
};

const today = new Date();
export const LinkDashboard = ({ linkId }: LinkDashboardProps) => {
  const [selectedDates, setSelectedDates] = useState<[string, string]>([
    addMonths(today, -1).toISOString(),
    today.toISOString(),
  ]);

  const params = useMemo(() => {
    return {
      from: selectedDates[0],
      to: selectedDates[1],
      id: linkId,
    };
  }, [selectedDates, linkId]);

  const { stats, isFetching, isLoading } = useLinkStats(params);

  const todaysStatsData = useMemo(() => {
    if (!stats?.data) {
      return [{ label: 'Visits', count: 0 }];
    }

    return [{ label: 'Visits', count: stats?.data.today.impressions }];
  }, [stats?.data]);

  const realtimeStatsData = useMemo(() => {
    if (!stats?.data) {
      return [{ label: 'Visits', count: 0 }];
    }

    return [{ label: 'Visits', count: stats?.data.impressions }];
  }, [stats?.data]);

  // TODO: When single link GET endpoint is merged, then add a header
  // with the link name if ID is provided

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
          label="Visits"
          isDate
        />
        <TimelineChart data={stats?.data.language} label="Language" />
        <TimelineChart data={stats?.data.region} label="Region" />
      </SimpleGrid>
    </Box>
  );
};
