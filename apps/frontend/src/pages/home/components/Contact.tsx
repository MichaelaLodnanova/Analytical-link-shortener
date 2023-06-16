import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { ContactFormSchema } from 'common';
import ContactForm from './ContactForm';
import { useNavigate } from 'react-router-dom';
import backgroundPicture from '../../../assets/images/pngegg.png';
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
    <Box
      minH={'2xl'}
      backgroundColor={'primary.100'}
      backgroundImage={backgroundPicture}
      backgroundSize={'cover'}
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Flex justifyContent={'flex-start'}>
        <Card position={'relative'}>
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
    </Box>
  );
}
