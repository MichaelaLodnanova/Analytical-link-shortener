import { HStack, Spinner } from '@chakra-ui/react';
import { RangeDatepicker } from 'chakra-dayzed-datepicker';
import { addMonths, endOfDay, startOfDay } from 'date-fns';
import { useEffect, useState } from 'react';

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
