import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, primary.main, primary.700)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Button
        bgGradient="linear(to-r, primary.main, primary.700, primary.200 )"
        color="white"
        variant="solid"
        transition="all 0.4s"
        _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
        onClick={() => navigate(-1)}
      >
        Take me back to safety
      </Button>
    </Box>
  );
}
