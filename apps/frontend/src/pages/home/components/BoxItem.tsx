import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type BoxItemProps = {
  color: React.ComponentProps<typeof Box>['backgroundColor'];
};

export default function BoxItem({
  color,
  children,
}: PropsWithChildren<BoxItemProps>) {
  return (
    <Box
      minH={'4xl'}
      backgroundColor={color}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Box>
  );
}
