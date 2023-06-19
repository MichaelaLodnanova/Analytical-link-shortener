import { Flex, FlexProps, Icon } from '@chakra-ui/react';
import { Role } from 'model';
import { PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

import { useUser } from '../../hooks/useUser';

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  roles?: Role[];
}
export const NavItem = ({
  icon,
  children,
  link,
  roles,
  ...rest
}: PropsWithChildren<NavItemProps>) => {
  const user = useUser();
  if (!user.authorized || (roles && roles.indexOf(user.user.role) == -1)) {
    return null;
  }

  return (
    <NavLink to={link}>
      {({ isActive }) => (
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          fontWeight={isActive ? 'bold' : undefined}
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      )}
    </NavLink>
  );
};
