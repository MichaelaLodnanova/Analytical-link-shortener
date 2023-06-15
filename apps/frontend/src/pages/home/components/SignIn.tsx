import { Box, Heading, VStack } from '@chakra-ui/react';
import SignInCard from './SignInCard';

export default function SignIn() {
  return (
    <Box minH={'3xl'} marginX={'10'}>
      <Heading color={'primary.100'}>Welcome to the Home Page</Heading>
      <VStack marginY={'16'}>
        <SignInCard></SignInCard>
      </VStack>
    </Box>
  );
}
