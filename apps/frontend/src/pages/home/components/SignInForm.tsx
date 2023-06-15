import { useForm } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  Input,
  Heading,
  Button,
} from '@chakra-ui/react';
import { LoginUserSchema } from 'common';
import { loginUserZod } from 'common';
import { zodResolver } from '@hookform/resolvers/zod';

type SingInFormProps = {
  onSubmit: (data: LoginUserSchema) => void;
};

export default function SignInForm({ onSubmit }: SingInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserSchema>({
    resolver: zodResolver(loginUserZod),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        padding="1"
        textAlign="center"
        isInvalid={errors.username != undefined ? true : undefined}
      >
        <Heading size={'sm'}>Username</Heading>
        <Input type="username" {...register('username', { required: true })} />
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
        <Input type="password" {...register('password', { required: true })} />
        <FormErrorMessage fontSize="sm" color="red">
          {errors.password && 'Password is required'}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" padding={'4'} mt="4" colorScheme="primary">
        Sign in
      </Button>
    </form>
  );
}
