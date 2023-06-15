import { Box, Image } from '@chakra-ui/react';
import SignInCard from './SignInCard';
import SignInNavBar from './SignInNavBar';
import picture from '../../../assets/TREE.png';
export default function SignIn() {
  return (
    <Box
      bg="#f7fafc"
      w="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <SignInNavBar />
      <Box
        flex="1"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Image src={picture} width={'2xl'}></Image>
        <SignInCard />
      </Box>
    </Box>
  );
}
