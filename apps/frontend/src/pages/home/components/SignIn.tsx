import { Box, Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import SignInCard from './SignInCard';

export default function SignIn() {
  return (
    <Box minH={'3xl'}>
      <Heading>Welcome to the Home Page</Heading>
      <VStack>
        <SignInCard></SignInCard>
      </VStack>
      <Text>Feel free to explore our website and learn more about us.</Text>
    </Box>
  );
}
