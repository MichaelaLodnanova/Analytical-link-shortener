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

type StatsRowProps = {
  label?: string;
  data: { label: string; count: number | string }[];
  isLoading?: boolean;
};

export default function StatsRow({ label, data, isLoading }: StatsRowProps) {
  return (
    <Card shadow={label ? undefined : 'none'}>
      {label && (
        <CardHeader>
          <Heading size="md">{label}</Heading>
        </CardHeader>
      )}
      <CardBody>
        <StatGroup>
          {data.map((item) => (
            <Stat key={item.label + item.count}>
              <StatLabel>{item.label}</StatLabel>
              <StatNumber>{isLoading ? <Spinner /> : item.count}</StatNumber>
            </Stat>
          ))}
        </StatGroup>
      </CardBody>
    </Card>
  );
}
