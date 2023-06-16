import { InputProps, Button, Divider } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterUserSchema, registerUserZod } from 'common';
import { useForm } from 'react-hook-form';
import FormField from './FormField';

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Divider marginY="4"></Divider>
      <Button type="submit" width={'xl'} marginY={'4'}>
        Sign Up
      </Button>
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
