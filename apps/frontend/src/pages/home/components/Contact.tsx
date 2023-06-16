import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
} from '@chakra-ui/react';
import BoxItem from './BoxItem';

export default function Contact() {
  return (
    <BoxItem color={'primary.100'}>
      <Flex justifyContent={'flex-start'}>
        <Card>
          <CardHeader>
            <Heading size={'2xl'} marginX={'6'}>
              Let's keep in touch!
            </Heading>
          </CardHeader>
          <CardBody></CardBody>
          <CardFooter></CardFooter>
        </Card>
      </Flex>
    </BoxItem>
  );
}
