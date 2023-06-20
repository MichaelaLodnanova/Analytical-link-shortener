import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import BoxItem from './BoxItem';
import SignUpForm from './SignUpForm';
import { RegisterUserSchema } from 'common';
import useRegister from '../../../hooks/useRegister';
import smokeImage from '../../../assets/images/smoke.png';

export default function SignUp() {
  const { register } = useRegister({ redirect: '/login' });
  const onSubmit = (data: RegisterUserSchema) => {
    register(data);
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <BoxItem color="primary.400">
      <Card colorScheme="primary" size="md">
        <CardHeader>
          <Heading size="lg">Sign Up with Email</Heading>
        </CardHeader>
        <CardBody>
          <SignUpForm onSubmit={onSubmit} />
        </CardBody>
        <CardFooter>
          <Text>
            By signing up you agree to the Terms of Service and Privacy Policy
          </Text>
        </CardFooter>
      </Card>
      {isMobile ? null : (
        <Image src={smokeImage} alt="smoke image" width="md" />
      )}
    </BoxItem>
  );
}
