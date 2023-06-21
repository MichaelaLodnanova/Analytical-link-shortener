import { AnonymizedUser } from 'common';
import { auth } from '../controllers/ApiController';
import { useQuery } from 'react-query';
import { Role } from 'model';
import { useCallback } from 'react';
type HasRoleFunc = (...role: Role[]) => boolean;
type UseUserAuthorized = {
  authorized: true;
  user: AnonymizedUser;
  hasRole: HasRoleFunc;
  isLoading: boolean;
  isError: boolean;
};

type UseUserUnauthorized = {
  authorized: false;
  hasRole: HasRoleFunc;
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

  const hasRole: HasRoleFunc = useCallback(
    (...roles) => {
      if (!data?.data.id) {
        return false;
      }

      return roles.includes(data.data.role);
    },
    [data]
  );

  if (!data || isError) {
    return {
      authorized: false,
      hasRole,
      isError,
      isLoading,
    };
  }

  return { authorized: true, user: data.data, hasRole, isLoading, isError };
};
