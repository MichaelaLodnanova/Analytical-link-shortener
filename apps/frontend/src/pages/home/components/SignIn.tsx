import { Box, VStack } from '@chakra-ui/react';
import SignInCard from './SignInCard';
import SignInNavBar from './SignInNavBar';

export default function SignIn() {
  return (
    <Box bg={'primary.100'}>
      <SignInNavBar></SignInNavBar>
      <Box minH={'3xl'} marginX={'10'}>
        <VStack marginY={'16'}>
          <SignInCard></SignInCard>
        </VStack>
      </Box>
    </Box>
  );
}
