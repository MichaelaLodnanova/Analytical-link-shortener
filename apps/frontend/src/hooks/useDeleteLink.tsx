import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';

import { deleteLink } from '../controllers/ApiController';

export default function useDeleteLink() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteAd,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (id: string) => {
      return deleteLink(id);
    },
    onError: () => {
      toast({
        title: 'Could not delete the link!',
        description: ':(',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Successfully deleted the link!',
        description: 'You have successfully deleted the link',
        status: 'success',
        colorScheme: 'primary',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      queryClient.invalidateQueries(['allLinks']);
    },
  });
  return { deleteAd, isLoading, isError };
}
