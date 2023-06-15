import { Flex, Image, HStack, Button, Box, IconButton } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useUser } from '../../hooks/useUser';
import { CiLogout } from 'react-icons/ci';
import useLogout from '../../hooks/useLogout';

export function Navbar() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };

  const navItems = useMemo(
    () => [
      { label: 'Home', to: 'home' },
      { label: 'About', to: 'about' },
      { label: 'Shorten Path', to: 'shortenpath' },
      { label: 'Contact', to: 'contact' },
    ],
    []
  );
  const { authorized } = useUser();
  const { logout } = useLogout({ redirect: '/' });
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
        <HStack>
          {!authorized && (
            <Button
              bg="cyan.50"
              _hover={{ bg: 'cyan.100', borderColor: 'cyan.100' }}
              borderColor={'cyan.50'}
              marginX={'2'}
              onClick={handleSignInClick}
            >
              Sign In
            </Button>
          )}
          {authorized && (
            <IconButton
              aria-label="logout"
              bg="transparent"
              borderRadius={'full'}
              _hover={{ bg: 'cyan.100', borderColor: 'cyan.100' }}
              marginX={'2'}
              type="button"
              onClick={() => logout()}
            >
              <CiLogout size="1.5rem" />
            </IconButton>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
