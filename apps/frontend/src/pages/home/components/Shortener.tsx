import { useState, ChangeEvent, FormEvent } from 'react';
import { Input, Button, Flex } from '@chakra-ui/react';
import BoxItem from './BoxItem';

export default function Shortener() {
  const [url, setUrl] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform any necessary logic or API calls with the entered URL
    console.log('Submitted URL:', url);
    // Clear the input field
    setUrl('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <BoxItem color="#8458b3">
      <form onSubmit={handleSubmit}>
        <Flex justifyContent="center" alignItems="center" direction={'row'}>
          <Input
            type="url"
            placeholder="Enter URL"
            value={url}
            onChange={handleChange}
            backgroundColor={'white'}
            width={'2xl'}
          />
          <Button type="submit" colorScheme="twitter" ml={2}>
            Shorten
          </Button>
        </Flex>
      </form>
    </BoxItem>
  );
}
