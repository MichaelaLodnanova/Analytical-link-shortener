import { useForm } from 'react-hook-form';

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  useToast,
  FormControl,
  FormErrorMessage,
  Input,
  Heading,
  Button,
} from '@chakra-ui/react';
import { LoginUserSchema } from 'common';
import { useMutation, useQueryClient } from 'react-query';
import { login } from '../../../controllers/ApiController';
import { useNavigate } from 'react-router-dom';

export default function SignInCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserSchema>();
  const mutation = useMutation({
    mutationFn: (data: LoginUserSchema) => {
      return login(data);
    },
  });
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const onSubmit = (data: LoginUserSchema) => {
    // Handle form submission logic here
    console.log(data.username);
    mutation.mutate(data);
    if (mutation.isSuccess) {
      toast({
        title: 'Logged in!',
        description: 'You were successfully logged in',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
      queryClient.invalidateQueries('userData');
    } else {
      toast({
        title: 'User not found!',
        description: 'The user was not found, try a different password?',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack>
        <Card colorScheme="primary">
          <CardHeader>
            <Heading size={'md'}>Sign in</Heading>
          </CardHeader>
          <CardBody>
            <FormControl
              padding="1"
              textAlign="center"
              isInvalid={errors.username != undefined ? true : undefined}
            >
              <Heading size={'sm'}>Username</Heading>
              <Input
                type="username"
                {...register('username', { required: true })}
              />
              <FormErrorMessage fontSize="sm" color="red">
                {errors.username && 'Username is required'}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              padding="1"
              textAlign="center"
              isInvalid={errors.password != undefined ? true : undefined}
            >
              <Heading size={'sm'}>Password</Heading>
              <Input
                type="password"
                {...register('password', { required: true })}
              />
              <FormErrorMessage fontSize="sm" color="red">
                {errors.password && 'Password is required'}
              </FormErrorMessage>
            </FormControl>
          </CardBody>
          <CardFooter>
            <Button type="submit" padding={'4'} colorScheme="primary">
              Submit
            </Button>
          </CardFooter>
        </Card>
      </HStack>
    </form>
  );
}
