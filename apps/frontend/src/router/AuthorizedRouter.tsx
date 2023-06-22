import { Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';

import SidebarWithHeader from '../common/sidebar/SidebarWithHeader';
import { useUser } from '../hooks/useUser';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { SingleAdStats } from '../pages/singleAdStats';
import { SingleLinkStats } from '../pages/singleLinkStats';
import ProfileSettings from '../pages/welcomeAuth/ProfileSettings';
import NotFound from '../pages/notFound/NotFound';
import Shortener from '../pages/home/components/Shortener';

export default function AuthorizedRouter() {
  const { isLoading, authorized, hasRole } = useUser();
  const matchesAuth = useMatch('/auth');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !authorized) {
      navigate('/login');
    }
    if (matchesAuth) {
      navigate('/auth/dashboard');
    }
  }, [authorized, isLoading, navigate, matchesAuth]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <SidebarWithHeader>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/link-stats/:id" element={<SingleLinkStats />} />
          {hasRole('ADVERTISER', 'ADMIN') && (
            <Route path="/ad-stats/:id" element={<SingleAdStats />} />
          )}
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/add-link" element={<Shortener></Shortener>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SidebarWithHeader>
    </>
  );
}
