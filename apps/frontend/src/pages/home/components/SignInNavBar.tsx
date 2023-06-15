import { Box, Flex, HStack, Image, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function SignInNavBar() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/');
  };
  return (
    <Box boxShadow="0px 2px 4px rgba(0, 0, 0, 0.8)">
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
        <HStack>
          <Text color={'primary.100'}>Don't have an account?</Text>
          <Button
            colorScheme="gray"
            _hover={{ bg: 'cyan.100', borderColor: 'cyan.100' }}
            marginX={'2'}
            onClick={handleSignUpClick}
          >
            Sign up
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
