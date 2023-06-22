import { RequestLinkIdParams, RequestViewLinkQuery } from 'common';
import { useQuery } from 'react-query';
import { useDebounce } from 'usehooks-ts';
import { viewLink } from '../controllers/ApiController';
import { useMemo } from 'react';

export const useViewLink = (
  { id }: RequestLinkIdParams,
  query: RequestViewLinkQuery
) => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: useDebounce(
      useMemo(
        () => ['link', id, query.language, query.region],
        [id, query.language, query.region]
      ),
      250
    ),
    retry: false,
    keepPreviousData: true,
    queryFn: () => viewLink({ id }, query),
    staleTime: 1000 * 30, // 30 seconds
    refetchOnWindowFocus: false,
  });

  return { stats: data, isLoading, isError, isFetching };
};
