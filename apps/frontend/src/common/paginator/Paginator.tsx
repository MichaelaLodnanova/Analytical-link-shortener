import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { useCallback } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

type PaginatorProps = {
  pageNumber: number;
  isLoading?: boolean;
  onChange: (page: number) => void;
};

export function Paginator({ pageNumber, onChange, isLoading }: PaginatorProps) {
  const handleBack = useCallback(() => {
    if (pageNumber === 0) {
      return;
    }
    onChange(pageNumber - 1);
  }, [onChange, pageNumber]);

  const handleNext = useCallback(() => {
    onChange(pageNumber + 1);
  }, [onChange, pageNumber]);

  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      <IconButton
        disabled={pageNumber == 0}
        aria-label="Previous page"
        onClick={handleBack}
        icon={<FiArrowLeft />}
      />
      <Button isLoading={isLoading} _hover={{ cursor: 'default' }}>
        {pageNumber + 1}
      </Button>
      <IconButton
        aria-label="Next page"
        onClick={handleNext}
        icon={<FiArrowRight />}
      />
    </ButtonGroup>
  );
}
