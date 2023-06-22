import {
  InputProps,
  Button,
  Divider,
  Box,
  Flex,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterUserSchema, registerUserZod } from 'common';
import { useForm } from 'react-hook-form';
import FormField from './FormField';
import { useState } from 'react';

type SignUpFormProps = {
  onSubmit: (data: RegisterUserSchema) => void;
};

export default function SignUpForm({ onSubmit }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserZod),
  });

  const [role, setRole] = useState<'USER' | 'ADVERTISER'>('USER');

  const handleRoleChange = (value: 'USER' | 'ADVERTISER') => {
    setRole(value as 'USER' | 'ADVERTISER');
  };

  const handleFormSubmit = (data: RegisterUserSchema) => {
    data.role = role; // Assign the selected role to the form data
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit, console.error)}>
      {formFields.map((field) => (
        <FormField
          errors={errors}
          label={field.label}
          key={field.name}
          {...register(field.name)}
          type={field.type}
          placeholder={field.placeholder}
        ></FormField>
      ))}
      <Divider marginY="4" />
      <Box display="inline-block">
        <RadioGroup defaultValue="USER" onChange={handleRoleChange}>
          <Flex
            justifyContent="space-evenly"
            alignItems="center"
            direction="row"
          >
            <Radio value="USER">User</Radio>
            <Radio value="ADVERTISER">Advertiser</Radio>
          </Flex>
        </RadioGroup>
        <Button
          type="submit"
          width={[null, null, null, 'md', 'xl']}
          marginY="4"
        >
          Sign Up
        </Button>
      </Box>
    </form>
  );
}

const formFields: {
  name: keyof RegisterUserSchema;
  label: string;
  type: InputProps['type'];
  placeholder: string;
  errorMessage: string;
}[] = [
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    placeholder: 'Enter your email address',
    errorMessage: 'Email is required',
  },
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'Enter your username',
    errorMessage: 'Username is required',
  },
  {
    name: 'password',
    label: 'Enter password',
    type: 'password',
    placeholder: 'Create a password',
    errorMessage: 'Password is required',
  },
];
