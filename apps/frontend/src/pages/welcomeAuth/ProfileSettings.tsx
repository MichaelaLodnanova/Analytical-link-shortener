import {
  Heading,
  Stack,
  Button,
  useColorModeValue,
  InputProps,
  Container,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useUpdateUser from '../../hooks/useUpdateUser';
import { UpdateUserSchema, updateUserZod } from 'common';
import FormField from '../home/components/FormField';
import { NavLink } from 'react-router-dom';
import { DevTool } from '@hookform/devtools';
import { useUser } from '../../hooks/useUser';

export default function ProfileSettings(): JSX.Element {
  const { update } = useUpdateUser();
  const onSubmit = (data: UpdateUserSchema) => {
    update(data);
  };
  const user = useUser();
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserZod),
    mode: 'onChange',
    defaultValues: {
      name: user.authorized ? user.user.name : undefined,
      surname: user.authorized ? user.user.surname : undefined,
    },
  });
  const fieldValues = Object.values(getValues());
  const someOptionalFilled = fieldValues.some((fieldValue) => !!fieldValue);

  console.log(someOptionalFilled);
  return (
    <Container>
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
              isDisabled={!someOptionalFilled}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
      <DevTool control={control} />
    </Container>
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
    placeholder: 'name',
    type: 'text',
  },
  {
    label: 'Surname',
    name: 'surname',
    placeholder: 'surname',
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
