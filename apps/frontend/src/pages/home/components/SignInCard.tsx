import { Card, CardBody, CardHeader, HStack, Heading } from '@chakra-ui/react';
import { LoginUserSchema } from 'common';
import SignInForm from './SignInForm';
import useLogin from '../../../hooks/useLogin';
export default function SignInCard() {
  const { login } = useLogin({ redirect: '/' });
  const onSubmit = (data: LoginUserSchema) => {
    login(data);
  };

  return (
    <HStack>
      <Card bg={'#ae97db'} size={'lg'}>
        <CardHeader display={'flex'} justifyContent={'center'}>
          <Heading size={'lg'}>Sign in</Heading>
        </CardHeader>
        <CardBody>
          <SignInForm onSubmit={onSubmit} />
        </CardBody>
      </Card>
    </HStack>
  );
}
