import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import SidebarWithHeader from '../common/sidebar/SidebarWithHeader';
import { Dashboard } from '../pages/dashboard/Dashboard';
import ProfileSettings from '../pages/welcomeAuth/ProfileSettings';
import { Dashboard } from '../pages/dashboard/Dashboard';

export default function AuthorizedRouter() {
  const { isLoading, authorized } = useUser();
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
          <Route path="/lol" element={<p>xdd</p>} />
          <Route path="/profile" element={<ProfileSettings />} />
        </Routes>
      </SidebarWithHeader>
    </>
  );
}
