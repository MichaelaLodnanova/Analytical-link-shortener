import { Box, Stack, Heading } from '@chakra-ui/react';
import { LoginUserSchema } from 'common';
import SignInForm from './SignInForm';
import useLogin from '../../../hooks/useLogin';
export default function SignInCard() {
  const { login } = useLogin({ redirect: '/auth' });
  const onSubmit = (data: LoginUserSchema) => {
    login(data);
  };

  return (
    <Stack spacing={4}>
      <Box bg={'#ae97db'} p={4}>
        <Heading size={'lg'} textAlign={'center'}>
          Sign in
        </Heading>
      </Box>
      <Box bg={'#ae97db'} p={4}>
        <SignInForm onSubmit={onSubmit} />
      </Box>
    </Stack>
  );
}
