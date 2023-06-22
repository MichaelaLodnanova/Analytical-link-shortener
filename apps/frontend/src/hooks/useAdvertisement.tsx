import { useToast } from '@chakra-ui/react';
import { CreateAdvertisementSchema } from 'common';
import { useMutation, useQueryClient } from 'react-query';
import { createAdvertisement as apiCreateAdvertisement } from '../controllers/ApiController';
import { useNavigate } from 'react-router-dom';

export default function useAdvertisement() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const {
    mutateAsync: createAdvertisement,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (data: CreateAdvertisementSchema) => {
      return apiCreateAdvertisement(data);
    },
    onError: () => {
      toast({
        title: 'Error while creating advertisement!',
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
      queryClient.invalidateQueries(['allAds']);
      navigate('/auth/advertisements');
    },
  });
  return { createAdvertisement, isLoading, isError };
}
