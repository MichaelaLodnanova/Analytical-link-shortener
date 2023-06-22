import {
  RequestAllAdvertisementsGetQuery,
  RequestAllAdvertisementsIdParams,
} from 'common';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { allAdvertisements } from '../controllers/ApiController';

export const useAllAdvertisements = ({
  limit,
  offset,
  search,
  userId,
}: RequestAllAdvertisementsIdParams & RequestAllAdvertisementsGetQuery) => {
  const { data, isLoading, isError, isFetching, isPreviousData } = useQuery({
    queryKey: useMemo(
      () => ['allAds', limit, offset, search, userId],
      [limit, offset, search, userId]
    ),
    keepPreviousData: true,
    retry: false,
    queryFn: () => allAdvertisements({ limit, offset, search, userId }),
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: false,
  });

  return {
    advertisements: data,
    isLoading,
    isError,
    isFetching,
    isPreviousData,
  };
};
