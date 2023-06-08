import { Box } from '@chakra-ui/react';
import { Navbar } from '../../common/navbar';
import { Footer } from '../../common/footer';
import SignIn from './components/SignIn';
export function Home() {
  return (
    <Box width={'100dvw'}>
      <Navbar></Navbar>
      <Box backgroundColor="secondary.200" padding={'5'}>
        <SignIn></SignIn>
      </Box>
      <Footer></Footer>
    </Box>
  );
}
