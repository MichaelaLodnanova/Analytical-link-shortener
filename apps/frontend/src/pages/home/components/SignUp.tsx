import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react';
import BoxItem from './BoxItem';
import SignUpForm from './SignUpForm';
import { RegisterUserSchema } from 'common';
import useRegister from '../../../hooks/useRegister';

export default function SignUp() {
  const { register } = useRegister({ redirect: '/login' });
  const onSubmit = (data: RegisterUserSchema) => {
    register(data);
  };
  return (
    <BoxItem color="primary.400">
      <Card colorScheme="primary" size="md">
        <CardHeader>
          <Heading size="lg">Sign Up with Email</Heading>
        </CardHeader>
        <CardBody>
          <SignUpForm onSubmit={onSubmit}></SignUpForm>
        </CardBody>
        <CardFooter>
          <Text>
            By signing up you agree to the Terms of Service and Privacy Policy
          </Text>
        </CardFooter>
      </Card>
    </BoxItem>
  );
}
