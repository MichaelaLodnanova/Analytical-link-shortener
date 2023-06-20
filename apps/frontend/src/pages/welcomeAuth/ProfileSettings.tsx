import {
  Heading,
  Stack,
  Button,
  useColorModeValue,
  InputProps,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useUpdateUser from '../../hooks/useUpdateUser';
import { UpdateUserSchema, updateUserZod } from 'common';
import FormField from '../home/components/FormField';
import { NavLink } from 'react-router-dom';
import { DevTool } from '@hookform/devtools';

export default function ProfileSettings(): JSX.Element {
  const { update } = useUpdateUser();
  const onSubmit = (data: UpdateUserSchema) => {
    update(data);
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserZod),
    mode: 'onChange',
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>

          {formFields.map((field) => (
            <FormField
              key={field.label}
              label={field.label}
              {...register(field.name)}
              name={field.name}
              errors={errors}
              type={field.type}
              placeholder={field.placeholder}
            ></FormField>
          ))}

          <Stack spacing={6} direction={['column', 'row']}>
            <NavLink to={'/auth'}>
              <Button
                bg={'red.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'red.500',
                }}
              >
                Cancel
              </Button>
            </NavLink>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              type="submit"
              _hover={{
                bg: 'blue.500',
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
      <DevTool control={control} />
    </>
  );
}
const formFields: {
  name: keyof UpdateUserSchema;
  label: string;
  type: InputProps['type'];
  placeholder: string;
}[] = [
  {
    label: 'Name',
    name: 'name',
    placeholder: 'Name',
    type: 'text',
  },
  {
    label: 'Surname',
    name: 'surname',
    placeholder: 'Surname',
    type: 'text',
  },
  {
    label: 'Old Password',
    name: 'oldPassword',
    placeholder: 'old password',
    type: 'password',
  },
  {
    label: 'Password',
    name: 'newPassword',
    placeholder: 'password',
    type: 'password',
  },
];
