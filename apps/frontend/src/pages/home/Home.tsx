import { Box, Heading, Text } from '@chakra-ui/react';
import { Navbar } from '../../common/navbar';
import { Footer } from '../../common/footer';
export function Home() {
  return (
    <Box width={'100dvw'}>
      <Navbar></Navbar>
      <Box backgroundColor="secondary.200" padding={'5'}>
        <Heading>Welcome to the Home Page</Heading>
        <Text>Feel free to explore our website and learn more about us.</Text>
      </Box>
      <Footer></Footer>
    </Box>
  );
}
