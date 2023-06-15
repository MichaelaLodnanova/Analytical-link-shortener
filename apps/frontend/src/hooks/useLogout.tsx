import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { logout as apiLogout } from '../controllers/ApiController';

type UseLoginProps = {
  redirect: string;
};

const useLogout = ({ redirect }: UseLoginProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutateAsync: logout,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: () => apiLogout(),
    onSuccess: () => {
      navigate(redirect);
      queryClient.resetQueries(['auth']);
    },
  });

  return { logout, isLoading, isError };
};

export default useLogout;
