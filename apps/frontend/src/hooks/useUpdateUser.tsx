import { useToast } from '@chakra-ui/react';
import { UpdateUserSchema } from 'common';
import { useMutation, useQueryClient } from 'react-query';
import { update as apiUpdate } from '../controllers/ApiController';

export default function useUpdateUser() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutateAsync: update,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (data: UpdateUserSchema) => {
      return apiUpdate(data);
    },
    onError: () => {
      toast({
        title: 'Unable to change your account',
        description: 'There is an error while updating your account',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Successfully changed!',
        description: 'You have successfully changed your account',
        status: 'success',
        colorScheme: 'primary',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      queryClient.invalidateQueries(['auth']);
    },
  });
  return { update, isLoading, isError };
}
