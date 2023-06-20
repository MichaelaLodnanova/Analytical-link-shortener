import { Box, Divider, SimpleGrid } from '@chakra-ui/react';

import TodaysStats from './components/TodaysStats';
import TimelineChart from '../../common/charts/TimelineChart';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { useMemo, useState } from 'react';
import { startOfDay, endOfDay, addMonths } from 'date-fns';

const today = new Date();
export const AdvertiserDashboard = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    addMonths(today, -1),
    today,
  ]);

  const [[oldFrom, oldTo], setFromToCache] = useState<[string, string]>([
    '',
    '',
  ]);

  const [from, to]: [string, string] = useMemo((): [string, string] => {
    if (selectedDates.length == 2) {
      const data: [string, string] = [
        startOfDay(selectedDates[0]).toISOString(),
        endOfDay(selectedDates[1]).toISOString(),
      ];

      setFromToCache(data);
    }

    return [oldFrom, oldTo];
  }, [selectedDates, oldFrom, oldTo]);

  return (
    <Box>
      <TodaysStats />
      <Divider mt="8" mb="8" />

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 3 }}
        justifyContent={'flex-end'}
      >
        <span></span>
        <span></span>
        <RangeDatepicker
          selectedDates={selectedDates}
          onDateChange={setSelectedDates}
          maxDate={today}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ sm: 1, md: 1, lg: 2, xl: 2 }} spacing="8" mt="4">
        <TimelineChart
          from={from}
          to={to}
          isDate
          label="Impressions"
          statType="impressionsTimeline"
        />
        <TimelineChart
          from={from}
          to={to}
          isDate
          label="Conversions"
          statType="conversionTimeline"
        />
        <TimelineChart
          from={from}
          to={to}
          isDate
          label="Skips"
          statType="skipsTimeline"
        />
        <TimelineChart
          from={from}
          to={to}
          label="Language"
          statType="language"
        />
        <TimelineChart from={from} to={to} label="Region" statType="region" />
      </SimpleGrid>
    </Box>
  );
};
