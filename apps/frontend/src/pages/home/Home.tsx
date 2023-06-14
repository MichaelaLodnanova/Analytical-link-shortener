import { Box } from '@chakra-ui/react';
import { Navbar } from '../../common/navbar';
import { Footer } from '../../common/footer';
import SignIn from './components/SignIn';
export function Home() {
  return (
    <Box width={'100dvw'} backgroundColor="primary.800">
      <Navbar></Navbar>
      <SignIn></SignIn>
      <Footer></Footer>
    </Box>
  );
}
