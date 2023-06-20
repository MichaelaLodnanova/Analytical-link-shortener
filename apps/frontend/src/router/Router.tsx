import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home';
import SignIn from '../pages/home/components/SignIn';
import { Box } from '@chakra-ui/react';
import AuthorizedRouter from './AuthorizedRouter';

export function Router() {
  return (
    <BrowserRouter>
      <Box>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/auth/*" element={<AuthorizedRouter />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
