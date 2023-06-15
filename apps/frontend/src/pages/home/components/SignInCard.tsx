import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  useToast,
  Heading,
} from '@chakra-ui/react';
import { LoginUserSchema } from 'common';
import { useMutation, useQueryClient } from 'react-query';
import { login } from '../../../controllers/ApiController';
import { useNavigate } from 'react-router-dom';
import SignInForm from './SignInForm';

export default function SignInCard() {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: LoginUserSchema) => {
      return login(data);
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
      navigate('/');
      queryClient.invalidateQueries('userData');
    },
  });

  const onSubmit = (data: LoginUserSchema) => {
    mutation.mutate(data);
  };

  return (
    <HStack>
      <Card colorScheme="primary">
        <CardHeader>
          <Heading size={'md'}>Sign in</Heading>
        </CardHeader>
        <CardBody>
          <SignInForm onSubmit={onSubmit} />
        </CardBody>
      </Card>
    </HStack>
  );
}
