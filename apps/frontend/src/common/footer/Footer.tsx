import { Box, Text } from '@chakra-ui/react';

export function Footer() {
  return (
    <Box
      backgroundColor="gray.800"
      paddingY="4"
      display="flex"
      justifyContent="center"
      color="white"
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
    >
      <Text>Sniplyt &copy; 2023. All rights reserved.</Text>
    </Box>
  );
}
