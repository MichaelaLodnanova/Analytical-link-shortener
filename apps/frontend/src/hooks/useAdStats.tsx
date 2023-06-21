import { RequestStatsAdsGet } from 'common';
import { useQuery } from 'react-query';
import { useDebounce } from 'usehooks-ts';

import { adStatistics } from '../controllers/ApiController';
import { useMemo } from 'react';

export const useAdStats = ({ from, to, id }: RequestStatsAdsGet) => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: useDebounce(
      useMemo(() => ['ad', id, from, to], [id, from, to]),
      250
    ),
    keepPreviousData: true,
    retry: false,
    queryFn: () => adStatistics({ from, to, id }),
    staleTime: 1000 * 30, // 30 seconds
    refetchOnWindowFocus: false,
  });

  return { stats: data, isLoading, isError, isFetching };
};
