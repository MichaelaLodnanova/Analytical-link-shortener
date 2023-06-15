import { Box } from '@chakra-ui/react';
import SignInCard from './SignInCard';
import SignInNavBar from './SignInNavBar';

export default function SignIn() {
  return (
    <Box
      bg="primary.100"
      w="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <SignInNavBar />
      <Box flex="1" display="flex" justifyContent="center" alignItems="center">
        <SignInCard />
      </Box>
    </Box>
  );
}
