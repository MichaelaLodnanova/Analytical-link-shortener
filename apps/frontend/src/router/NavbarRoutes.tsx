import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../common/navbar';
import { Home } from '../pages/home';
import { Box } from '@chakra-ui/react';

export function NavbarRoutes() {
  return (
    <Box w="100dvw">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Box>
  );
}
