import { useForm } from 'react-hook-form';
import {
  Button,
  Flex,
  useBreakpointValue,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  FormControl,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import BoxItem from './BoxItem';
import { CreateAdvertisementSchema, createAdvertisementZod } from 'common';
import { zodResolver } from '@hookform/resolvers/zod';
import useAdvertisement from '../../../hooks/useAdvertisement';

export default function Advertisement() {
  const { createAdvertisement } = useAdvertisement();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateAdvertisementSchema>({
    resolver: zodResolver(createAdvertisementZod),
  });
  const onSubmit = (data: CreateAdvertisementSchema) => {
    createAdvertisement(data);
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <BoxItem color="primary.500">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <Heading color={'blackAlpha.700'}>Create your own adds!</Heading>
          </CardHeader>
          <CardBody>
            <Flex
              justifyContent={isMobile ? 'center' : 'flex-start'}
              alignItems="center"
              direction={'column'}
            >
              <FormControl isInvalid={!!errors.title} padding="2">
                <Input
                  type="text"
                  placeholder="Title"
                  {...register('title', { required: 'Title is required' })}
                  mb={2}
                />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.adUrl} padding="2">
                <Input
                  type="url"
                  placeholder="Ad URL"
                  {...register('adUrl', { required: 'Ad URL is required' })}
                  mb={2}
                />
                <FormErrorMessage>{errors.adUrl?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.forwardUrl} padding="2">
                <Input
                  type="url"
                  placeholder="Forward URL"
                  {...register('forwardUrl', {
                    required: 'Forward URL is required',
                  })}
                />
                <FormErrorMessage>
                  {errors.forwardUrl?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
          </CardBody>
          <CardFooter>
            <Button type="submit" colorScheme="purple" ml={isMobile ? 0 : 2}>
              Create
            </Button>
          </CardFooter>
        </Card>
      </form>
    </BoxItem>
  );
}
