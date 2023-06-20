import { useUser } from '../../hooks/useUser';
import { AdvertiserDashboard } from './AdvertiserDashboard';

export function Dashboard() {
  const data = useUser();
  if (!data.authorized) {
    return null;
  }

  if (data.user.role === 'ADVERTISER') {
    return <AdvertiserDashboard />;
  }

  if (data.user.role === 'USER') {
    return <div>TODO: User dashboard</div>;
  }

  if (data.user.role === 'ADMIN') {
    return <div>TODO: Admin dashboard</div>;
  }

  return null;
}
