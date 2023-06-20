import { RequestStatsAdsGet } from 'common';
import { useQuery } from 'react-query';

import { adStatistics } from '../controllers/ApiController';

export const useAdStats = ({ from, to, id }: RequestStatsAdsGet) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['auth', id, from, to],
    retry: false,
    queryFn: () => adStatistics({ from, to, id }),
    staleTime: 1000 * 30, // 30 seconds
    refetchOnWindowFocus: false,
  });

  return { stats: data, isLoading, isError };
};
