import { AnonymizedUser } from 'common';

type UseUserAuthorized = {
  authorized: true;
  user: AnonymizedUser;
};

type UseUserUnauthorized = {
  authorized: false;
};

export const useUser: () => UseUserAuthorized | UseUserUnauthorized = () => {
  // TODO: Implement authorization logic
  return { authorized: false };
};
