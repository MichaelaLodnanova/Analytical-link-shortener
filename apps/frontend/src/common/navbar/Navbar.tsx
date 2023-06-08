import { chakra, Flex, Image, HStack, Button } from '@chakra-ui/react';

export function Navbar() {
  return (
    <chakra.header id="header">
      <Flex
        w="100%"
        px="6"
        py="10"
        align="center"
        justify="space-between"
        backgroundColor="primary.main"
      >
        // TODO: Logo
        <Image src="" h="50px" />
        <HStack as="nav" spacing="5"></HStack>
        <HStack>
          <Button colorScheme="secondary" marginX={'2'}>
            Sign In
          </Button>
        </HStack>
      </Flex>
    </chakra.header>
  );
}
