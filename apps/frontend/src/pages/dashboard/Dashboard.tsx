import { useUser } from '../../hooks/useUser';
import { AdminDashboard } from './AdminDashboard';
import { AdvertisementDashboard } from './AdvertisementDashboard';
import { LinkDashboard } from './LinkDashboard';

export function Dashboard() {
  const data = useUser();
  if (!data.authorized) {
    return null;
  }

  if (data.user.role === 'ADVERTISER') {
    return <AdvertisementDashboard />;
  }

  if (data.user.role === 'USER') {
    return <LinkDashboard />;
  }

  if (data.user.role === 'ADMIN') {
    return <AdminDashboard />;
  }

  return null;
}
