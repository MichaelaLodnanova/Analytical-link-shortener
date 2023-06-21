import { RequestStatsLinkGet } from 'common';
import { useQuery } from 'react-query';
import { useDebounce } from 'usehooks-ts';
import { linkStatistics } from '../controllers/ApiController';
import { useMemo } from 'react';

export const useLinkStats = ({ from, to, id }: RequestStatsLinkGet) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: useDebounce(
      useMemo(() => ['link', id, from, to], [id, from, to]),
      250
    ),
    retry: false,
    queryFn: () => linkStatistics({ from, to, id }),
    staleTime: 1000 * 30, // 30 seconds
    refetchOnWindowFocus: false,
  });

  return { stats: data, isLoading, isError };
};
