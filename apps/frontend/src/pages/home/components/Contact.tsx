import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  useToast,
} from '@chakra-ui/react';
import BoxItem from './BoxItem';
import { ContactFormSchema } from 'common';
import ContactForm from './ContactForm';
import { useNavigate } from 'react-router-dom';
export default function Contact() {
  const toast = useToast();
  const navigate = useNavigate();
  const onSubmit = (data: ContactFormSchema) => {
    console.log(data);
    toast({
      title: 'Message sent',
      description: 'Your message was successfully sent.',
      status: 'success',
      colorScheme: 'primary',
      duration: 5000,
      isClosable: true,
    });
    navigate('/');
  };
  return (
    <BoxItem color={'primary.100'}>
      <Flex justifyContent={'flex-start'}>
        <Card>
          <CardHeader>
            <Heading size={'2xl'} marginX={'6'}>
              Let's keep in touch!
            </Heading>
          </CardHeader>
          <CardBody>
            <ContactForm onSubmit={onSubmit}></ContactForm>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </Flex>
    </BoxItem>
  );
}
