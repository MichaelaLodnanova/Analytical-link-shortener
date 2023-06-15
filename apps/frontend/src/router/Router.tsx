import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home';
import SignIn from '../pages/home/components/SignIn';
import { Box } from '@chakra-ui/react';
import { Footer } from '../common/footer';

export function Router() {
  return (
    <BrowserRouter>
      <Box width={'100dvw'} backgroundColor="primary.800">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
        <Footer></Footer>
      </Box>
    </BrowserRouter>
  );
}
