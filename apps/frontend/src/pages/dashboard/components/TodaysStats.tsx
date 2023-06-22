import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Spinner,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';

import { useAdStats } from '../../../hooks/useAdStats';
const tmpData = {
  from: new Date().toISOString(),
  to: new Date().toISOString(),
};
export default function TodaysStats() {
  const { stats } = useAdStats(tmpData);
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Today's Stats</Heading>
      </CardHeader>
      <CardBody>
        <StatGroup>
          <Stat>
            <StatLabel>Impressions</StatLabel>
            <StatNumber>
              {stats ? stats?.data.today.impressions : <Spinner />}
            </StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Conversions</StatLabel>
            <StatNumber>
              {stats ? stats?.data.today.conversions : <Spinner />}
            </StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Skips</StatLabel>
            <StatNumber>
              {stats ? stats?.data.today.skips : <Spinner />}
            </StatNumber>
          </Stat>
        </StatGroup>
      </CardBody>
    </Card>
  );
}
