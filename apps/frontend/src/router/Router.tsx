import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NavbarRoutes } from './NavbarRoutes';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<NavbarRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
