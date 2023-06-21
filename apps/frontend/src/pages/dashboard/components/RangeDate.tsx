import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { useEffect, useMemo, useState } from 'react';
import { startOfDay, endOfDay, addMonths } from 'date-fns';
import { Box, HStack, Spinner } from '@chakra-ui/react';

type RangeDateProps = {
  onChange: (dates: [string, string]) => void;
  isLoading?: boolean;
};

const today = new Date();
export default function RangeDate({ onChange, isLoading }: RangeDateProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    addMonths(today, -1),
    today,
  ]);

  useEffect(() => {
    if (selectedDates.length == 2) {
      const data: [string, string] = [
        startOfDay(selectedDates[0]).toISOString(),
        endOfDay(selectedDates[1]).toISOString(),
      ];

      onChange([data[0], data[1]]);
    }
  }, [selectedDates, onChange]);

  return (
    <HStack>
      {isLoading && <Spinner />}
      <RangeDatepicker
        disabled={isLoading}
        selectedDates={selectedDates}
        onDateChange={setSelectedDates}
        maxDate={today}
      />
    </HStack>
  );
}
