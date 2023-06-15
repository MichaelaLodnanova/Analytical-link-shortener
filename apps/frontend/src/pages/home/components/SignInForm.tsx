import { useForm } from 'react-hook-form';

import { Button } from '@chakra-ui/react';
import { LoginUserSchema } from 'common';
import { loginUserZod } from 'common';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from './FormField';

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
      <FormField
        errors={errors}
        label={'Username'}
        {...register('username')}
        name={'username'}
      ></FormField>
      <FormField
        errors={errors}
        label={'Password'}
        {...register('password')}
        name={'password'}
        type={'password'}
      ></FormField>
      <Button type="submit" padding={'4'} mt="4" colorScheme="primary">
        Sign in
      </Button>
    </form>
  );
}
