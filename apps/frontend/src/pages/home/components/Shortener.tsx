import { useState, ChangeEvent, FormEvent } from 'react';
import {
  Input,
  Button,
  Flex,
  useBreakpointValue,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';
import BoxItem from './BoxItem';

export default function Shortener() {
  const [url, setUrl] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUrl('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <BoxItem color="#a088bd">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <Heading color={'blackAlpha.700'}>Shorten with us!</Heading>
          </CardHeader>
          <CardBody>
            <Flex
              justifyContent={isMobile ? 'center' : 'flex-start'}
              alignItems="center"
              direction={isMobile ? 'column' : 'row'}
            >
              <Input
                type="url"
                placeholder="Enter URL"
                value={url}
                onChange={handleChange}
                backgroundColor="white"
                width={isMobile ? '100%' : '2xl'}
                mb={isMobile ? 2 : 0}
              />
            </Flex>
          </CardBody>
          <CardFooter>
            <Button type="submit" colorScheme="purple" ml={isMobile ? 0 : 2}>
              Shorten
            </Button>
          </CardFooter>
        </Card>
      </form>
    </BoxItem>
  );
}
