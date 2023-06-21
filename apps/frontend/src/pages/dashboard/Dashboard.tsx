import { useUser } from '../../hooks/useUser';
import { AdminDashboard } from './AdminDashboard';
import { AdvertiserDashboard } from './AdvertiserDashboard';
import { UserDashboard } from './UserDashboard';

export function Dashboard() {
  const data = useUser();
  if (!data.authorized) {
    return null;
  }

  if (data.user.role === 'ADVERTISER') {
    return <AdvertiserDashboard />;
  }

  if (data.user.role === 'USER') {
    return <UserDashboard />;
  }

  if (data.user.role === 'ADMIN') {
    return <AdminDashboard />;
  }

  return null;
}
