import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { HamburgerIcon } from '@chakra-ui/icons';

export function Navbar() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignInClick = () => {
    navigate('/login');
  };

  const navItems = useMemo(
    () => [
      { label: 'Home', to: 'home' },
      { label: 'About', to: 'about' },
      { label: 'Contact', to: 'contact' },
    ],
    []
  );

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
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Sniplyt
        </Text>
        <HStack as="nav" spacing="5" display={{ base: 'none', md: 'flex' }}>
          {navItems.map((item) => (
            <ScrollLink key={item.to} to={item.to} smooth={true} duration={500}>
              <Button
                bg={'navbar.100'}
                _hover={{ bg: 'navbar.200', borderColor: 'navbar.200' }}
                borderColor={'navbar.100'}
              >
                {item.label}
              </Button>
            </ScrollLink>
          ))}
        </HStack>
        <HStack display={{ base: 'none', md: 'flex' }}>
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
        <IconButton
          aria-label="Toggle navigation"
          icon={<HamburgerIcon />}
          size="md"
          variant="ghost"
          display={{ base: 'flex', md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
      {isOpen && (
        <Flex
          direction="column"
          align="center"
          backgroundColor="primary.800"
          py="4"
          display={{ base: 'flex', md: 'none' }}
        >
          {navItems.map((item) => (
            <ScrollLink key={item.to} to={item.to} smooth={true} duration={500}>
              <Button
                w="full"
                bg={'navbar.100'}
                _hover={{ bg: 'navbar.200', borderColor: 'navbar.200' }}
                borderColor={'navbar.100'}
                my="2"
              >
                {item.label}
              </Button>
            </ScrollLink>
          ))}
          <Button
            w="full"
            bg="cyan.50"
            _hover={{ bg: 'cyan.100', borderColor: 'cyan.100' }}
            borderColor={'cyan.50'}
            onClick={handleSignInClick}
          >
            Sign In
          </Button>
        </Flex>
      )}
    </Box>
  );
}
