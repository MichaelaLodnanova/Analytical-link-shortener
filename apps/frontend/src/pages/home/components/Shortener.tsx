import { useForm } from 'react-hook-form';
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
  Text,
  FormControl,
  Switch,
} from '@chakra-ui/react';
import BoxItem from './BoxItem';
import useLink from '../../../hooks/useLink';
import { CreateLinkSchema, createLinkZod } from 'common';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Shortener() {
  const { shortenLink, data } = useLink();
  const { handleSubmit, register } = useForm<CreateLinkSchema>({
    resolver: zodResolver(createLinkZod),
  });
  const onSubmit = (data: CreateLinkSchema) => {
    shortenLink(data);
  };

  const isMobile = useBreakpointValue({ base: true, md: false });
  if (data) {
    const shortenedLink = `${window.location.origin}/l/${data.data.shortId}`;

    const handleCopyClick = () => {
      navigator.clipboard.writeText(shortenedLink);
    };
    return (
      <BoxItem color="primary.500">
        <Card>
          <CardHeader>
            <Heading color={'blackAlpha.700'}>Shortened Link</Heading>
          </CardHeader>
          <CardBody>
            <Flex
              justifyContent={isMobile ? 'center' : 'flex-start'}
              alignItems="center"
              direction={isMobile ? 'column' : 'row'}
            >
              <Text>{shortenedLink}</Text>
              <Button onClick={handleCopyClick} ml={2}>
                Copy
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </BoxItem>
    );
  }
  return (
    <BoxItem color="primary.500">
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <FormControl>
                <Flex direction={'column'}>
                  <Switch {...register('isAdvertisementEnabled')} paddingY={2}>
                    Enable advertisements
                  </Switch>
                  <Input
                    type="url"
                    placeholder="Enter URL"
                    backgroundColor="white"
                    width={isMobile ? '100%' : '2xl'}
                    mb={isMobile ? 2 : 0}
                    {...register('url')} // Add the register method here
                  />
                </Flex>
              </FormControl>
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
