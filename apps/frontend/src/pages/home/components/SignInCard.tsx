import pic from '../../../assets/images/homepicture.svg';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';
export default function SignInCard() {
  return (
    <HStack>
      <Card>
        <CardHeader>Sign In</CardHeader>
        <CardBody>
          <Text>Nejake piko</Text>
        </CardBody>
        <CardFooter>
          <Text>Nejake piko</Text>
        </CardFooter>
      </Card>
      <Image src={pic} width="5xl"></Image>
    </HStack>
  );
}
