import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Role } from 'model';
import { IconType } from 'react-icons';
import { FiDatabase, FiLink, FiPaperclip } from 'react-icons/fi';

import { NavItem } from './NavItems';

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
  roles?: Role[];
}
const LinkItems: Array<LinkItemProps> = [
  {
    name: 'Dashboard',
    icon: FiDatabase,
    url: '/auth/dashboard',
  },
  {
    name: 'Adverts',
    icon: FiPaperclip,
    url: '/auth/dashboard',
    roles: ['ADVERTISER', 'ADMIN'],
  },
  {
    name: 'Links',
    icon: FiLink,
    url: '/auth/dashboard',
  },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('blue.50', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Sniplyt
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          link={link.url}
          roles={link.roles}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
