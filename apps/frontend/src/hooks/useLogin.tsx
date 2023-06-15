import { useToast } from '@chakra-ui/react';
import { LoginUserSchema } from 'common';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../controllers/ApiController';

type UseLoginProps = {
  redirect: string;
};

export default function useLogin({ redirect }: UseLoginProps) {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutateAsync: login,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (data: LoginUserSchema) => {
      return apiLogin(data);
    },
    onError: () => {
      toast({
        title: 'User not found!',
        description: 'The user was not found, try a different password?',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
    onSuccess: () => {
      toast({
        title: 'Logged in!',
        description: 'You were successfully logged in',
        status: 'success',
        colorScheme: 'primary',
        duration: 5000,
        isClosable: true,
      });
      navigate(redirect);
      queryClient.invalidateQueries(['auth']);
    },
  });
  return { login, isLoading, isError };
}
