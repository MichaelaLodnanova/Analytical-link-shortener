import { Box, Button, Center, Flex, HStack, Heading } from '@chakra-ui/react';
import { ViewLinkData } from 'common';

export function AdvertisementPortal({ link, advertisement }: ViewLinkData) {
  return (
    <Flex direction="column" width="100dvw" height="100dvh">
      <HStack justifyContent="flex-end" backgroundColor="primary.main">
        <Center flexGrow="1">
          <Heading size="md" noOfLines={1}>
            {advertisement?.title} - {link.shortId}
          </Heading>
        </Center>
        <Button my="4" mx="2">
          Skip in 5
        </Button>
      </HStack>
      <Flex flex={'1'} height="100%" position="relative">
        <Center width="100%" height="100%" flex="1" flexGrow="1" bg="teal.100">
          {' '}
          oiamxdokmsa{' '}
        </Center>
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          onClick={() => alert('lol')}
        ></Box>
      </Flex>
    </Flex>
  );
}
