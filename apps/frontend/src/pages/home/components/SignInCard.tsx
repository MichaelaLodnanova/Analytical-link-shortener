import pic from '../../../assets/images/homepicture.svg';
import { Card, Flex, Image, Text } from '@chakra-ui/react';
export default function SignInCard() {
  return (
    <Card>
      <Flex direction={'row'} alignItems={'center'} justifyContent={'center'}>
        <Text>Nejake piko</Text>
        <Image src={pic} maxW={'xl'}></Image>
      </Flex>
    </Card>
  );
}
