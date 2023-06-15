import { Flex, Image, HStack, Button, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

export function Navbar() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };
  return (
    <Box>
      <Flex
        w="100%"
        maxH={'12'}
        px="6"
        py="10"
        align="center"
        justify="space-between"
        backgroundColor="primary.800"
      >
        {/* TODO: Logo */}
        <Image src="" h="50px" />
        <HStack as="nav" spacing="5">
          <ScrollLink to="home" smooth={true} duration={500}>
            <Button
              bg={'navbar.100'}
              _hover={{ bg: 'navbar.200', borderColor: 'navbar.200' }}
              borderColor={'navbar.100'}
            >
              Home
            </Button>
          </ScrollLink>
          <ScrollLink to="about" smooth={true} duration={500}>
            <Button
              bg={'navbar.100'}
              _hover={{ bg: 'navbar.200', borderColor: 'navbar.200' }}
              borderColor={'navbar.100'}
            >
              About
            </Button>
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500}>
            <Button
              bg={'navbar.100'}
              _hover={{ bg: 'navbar.200', borderColor: 'navbar.200' }}
              borderColor={'navbar.100'}
            >
              Contact
            </Button>
          </ScrollLink>
          <ScrollLink to="shortenpath" smooth={true} duration={500}>
            <Button
              bg={'navbar.100'}
              _hover={{ bg: 'navbar.200', borderColor: 'navbar.200' }}
              borderColor={'navbar.100'}
            >
              Shorten Path
            </Button>
          </ScrollLink>
        </HStack>
        <HStack>
          <Button
            bg="cyan.50"
            _hover={{ bg: 'cyan.100', borderColor: 'cyan.100' }}
            borderColor={'cyan.50'}
            marginX={'2'}
            onClick={handleSignInClick}
          >
            Sign In
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
