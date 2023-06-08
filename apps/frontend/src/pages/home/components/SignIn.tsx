import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import SignInCard from './SignInCard';

export default function SignIn() {
  return (
    <Flex direction={'column'}>
      <Heading>Welcome to the Home Page</Heading>
      <Box>
        <SignInCard></SignInCard>
      </Box>
      <Text>Feel free to explore our website and learn more about us.</Text>
    </Flex>
  );
}
