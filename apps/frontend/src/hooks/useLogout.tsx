import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { logout as apiLogout } from '../controllers/ApiController';
import { useToast } from '@chakra-ui/react';

type UseLoginProps = {
  redirect: string;
};

const useLogout = ({ redirect }: UseLoginProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    mutateAsync: logout,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: () => apiLogout(),
    onSuccess: () => {
      navigate(redirect);
      queryClient.resetQueries(['auth']);
      toast({
        title: 'Successfully signed out!',
        description: 'You were successfully signed out!',
        status: 'success',
        colorScheme: 'primary',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  return { logout, isLoading, isError };
};

export default useLogout;
