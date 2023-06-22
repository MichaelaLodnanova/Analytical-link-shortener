import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

import { FiPlus } from 'react-icons/fi';
import { useUser } from '../../hooks/useUser';
import { Link } from 'react-router-dom';

export default function AddNewMenu() {
  const { hasRole } = useUser();

  const isAdvertiser = hasRole('ADVERTISER', 'ADMIN');

  return (
    <Menu>
      <MenuButton
        mr="4"
        as={IconButton}
        aria-label="Options"
        icon={<FiPlus size="24" />}
        colorScheme="green"
      />
      <MenuList>
        <MenuItem as={Link} to="/auth/add-link">
          Shorten Link!
        </MenuItem>
        <MenuItem
          isDisabled={!isAdvertiser}
          position="relative"
          as={Link}
          to="/auth/add-advertisement"
        >
          Add new Advertisement
          {!isAdvertiser && (
            <Text as="sub" position="absolute" left="3" bottom="1">
              Become advertiser!
            </Text>
          )}
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
