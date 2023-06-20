import { useState, ChangeEvent, FormEvent } from 'react';
import { Input, Button, Flex, useBreakpointValue } from '@chakra-ui/react';
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
    <BoxItem color="#8458b3">
      <form onSubmit={handleSubmit}>
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
          <Button type="submit" colorScheme="twitter" ml={isMobile ? 0 : 2}>
            Shorten
          </Button>
        </Flex>
      </form>
    </BoxItem>
  );
}
