import { Center, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { AdvertisementDashboard } from '../dashboard/AdvertisementDashboard';

export function SingleAdStats() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return (
      <Center>
        <Text>No ID provided</Text>
      </Center>
    );
  }
  return <AdvertisementDashboard adId={id} />;
}
