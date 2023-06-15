import { AnonymizedUser } from 'common';
import { auth } from '../controllers/ApiController';
import { useQuery } from 'react-query';

type UseUserAuthorized = {
  authorized: true;
  user: AnonymizedUser;
  isLoading: boolean;
  isError: boolean;
};

type UseUserUnauthorized = {
  authorized: false;
  isLoading: boolean;
  isError: boolean;
};

export const useUser: () => UseUserAuthorized | UseUserUnauthorized = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['auth'],
    retry: false,
    queryFn: () => auth(),
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: false,
  });

  if (!data || isError) {
    return {
      authorized: false,
      isError,
      isLoading,
    };
  }

  return { authorized: true, user: data.data, isLoading, isError };
};
