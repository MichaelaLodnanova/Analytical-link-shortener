import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';

import { deleteAdvertisement } from '../controllers/ApiController';

export default function useDeleteAdvertisement() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteAd,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (id: string) => {
      return deleteAdvertisement(id);
    },
    onError: () => {
      toast({
        title: 'Could not delete the ad!',
        description: ':(',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Successfully deleted the Ad!',
        description: 'You have successfully deleted the ad',
        status: 'success',
        colorScheme: 'primary',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      queryClient.invalidateQueries(['allAds']);
    },
  });
  return { deleteAd, isLoading, isError };
}
