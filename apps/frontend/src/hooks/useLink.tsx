import { useToast } from '@chakra-ui/react';
import { CreateLinkSchema } from 'common';
import { useMutation, useQueryClient } from 'react-query';
import { shortenLink as apiShortenLink } from '../controllers/ApiController';

export default function useLink() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutateAsync: shortenLink,
    isLoading,
    isError,
    data,
  } = useMutation({
    mutationFn: (data: CreateLinkSchema) => {
      return apiShortenLink(data);
    },
    onError: () => {
      toast({
        title: 'Error while shortening!',
        description: 'Try it again',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: '',
        status: 'success',
        colorScheme: 'primary',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      queryClient.invalidateQueries(['allLinks']);
    },
  });
  return { shortenLink, data, isLoading, isError };
}
