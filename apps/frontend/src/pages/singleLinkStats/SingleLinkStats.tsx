import { Center, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { LinkDashboard } from '../dashboard/LinkDashboard';

export function SingleLinkStats() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return (
      <Center>
        <Text>No ID provided</Text>
      </Center>
    );
  }
  return <LinkDashboard linkId={id} />;
}
