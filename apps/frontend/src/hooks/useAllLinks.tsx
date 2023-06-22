import { RequestAllLinksGetQuery, RequestAllLinksIdParams } from 'common';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { allLinks } from '../controllers/ApiController';

export const useAllLink = ({
  limit,
  offset,
  search,
  userId,
}: RequestAllLinksIdParams & RequestAllLinksGetQuery) => {
  const { data, isLoading, isError, isFetching, isPreviousData } = useQuery({
    queryKey: useMemo(
      () => ['allLinks', limit, offset, search, userId],
      [limit, offset, search, userId]
    ),
    keepPreviousData: true,
    retry: false,
    queryFn: () => allLinks({ limit, offset, search, userId }),
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: false,
  });

  return {
    links: data,
    isLoading,
    isError,
    isFetching,
    isPreviousData,
  };
};
