import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home';
import SignIn from '../pages/home/components/SignIn';
import { Box } from '@chakra-ui/react';
import { Footer } from '../common/footer';
import AuthorizedRouter from './AuthorizedRouter';

export function Router() {
  return (
    <BrowserRouter>
      <Box width={'100dvw'}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/auth/*" element={<AuthorizedRouter />} />
        </Routes>
        <Footer></Footer>
      </Box>
    </BrowserRouter>
  );
}
