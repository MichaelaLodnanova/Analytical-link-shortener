import { useToast } from '@chakra-ui/react';
import { RegisterUserSchema } from 'common';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { register as apiRegister } from '../controllers/ApiController';

type UseRegisterProps = {
  redirect: string;
};

export default function useUpdateUser({ redirect }: UseRegisterProps) {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutateAsync: register,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (data: RegisterUserSchema) => {
      return apiRegister(data);
    },
    onError: () => {
      toast({
        title: 'User already registered!',
        description: 'You already have an account',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Successfully registered!',
        description: 'You were successfully registered',
        status: 'success',
        colorScheme: 'primary',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      navigate(redirect);
      queryClient.invalidateQueries(['auth']);
    },
  });
  return { register, isLoading, isError };
}
