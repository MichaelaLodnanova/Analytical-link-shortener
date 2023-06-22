import { useToast } from '@chakra-ui/react';
import { RequestLinkIdParams, RequestLinkPatchReqBody } from 'common';
import { useMutation, useQueryClient } from 'react-query';

import { updateLink } from '../controllers/ApiController';

export default function useUpdateLink() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutateAsync: update,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (data: RequestLinkIdParams & RequestLinkPatchReqBody) => {
      return updateLink(data);
    },
    onError: () => {
      toast({
        title: 'Link not updated!',
        description: ':/ something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Link updated!',
        description: 'Link successfully updated!',
        status: 'success',
        colorScheme: 'primary',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      queryClient.invalidateQueries(['allLinks']);
    },
  });
  return { update, isLoading, isError };
}
