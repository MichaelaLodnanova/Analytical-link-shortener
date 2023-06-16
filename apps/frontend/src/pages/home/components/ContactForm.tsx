import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema, contactFormZod } from 'common';
import { useForm } from 'react-hook-form';
import FormField from './FormField';
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  InputProps,
  Textarea,
} from '@chakra-ui/react';

type ContactFormProps = {
  onSubmit: (data: ContactFormSchema) => void;
};
export default function ContactForm({ onSubmit }: ContactFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormZod),
  });
  const onSubmitHandle = (data: ContactFormSchema) => {
    onSubmit(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandle)}>
      <Flex direction={'row'} justifyContent={'space-evenly'}>
        <Grid>
          <GridItem>
            <FormField
              errors={errors}
              label={formFields[0].label}
              {...register(formFields[0].name)}
              type={formFields[0].type}
              placeholder={formFields[0].placeholder}
            ></FormField>
          </GridItem>
          <GridItem>
            <FormField
              errors={errors}
              label={formFields[1].label}
              {...register(formFields[1].name)}
              type={formFields[1].type}
              placeholder={formFields[1].placeholder}
            ></FormField>
          </GridItem>
          <GridItem></GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <FormField
              errors={errors}
              label={formFields[2].label}
              {...register(formFields[2].name)}
              type={formFields[2].type}
              placeholder={formFields[2].placeholder}
            ></FormField>
          </GridItem>
          <GridItem>
            <FormField
              errors={errors}
              label={formFields[3].label}
              {...register(formFields[3].name)}
              type={formFields[3].type}
              placeholder={formFields[3].placeholder}
            ></FormField>
          </GridItem>
          <GridItem></GridItem>
        </Grid>
      </Flex>
      <FormControl
        padding="1"
        isRequired
        textAlign="center"
        isInvalid={errors.message != undefined ? true : undefined}
      >
        <Textarea
          placeholder={formFields[4].placeholder}
          {...register(formFields[4].name)}
          height="10"
        />
        <FormErrorMessage fontSize="sm" color="red">
          {errors.message?.message}
        </FormErrorMessage>
      </FormControl>
      <Divider marginY="4"></Divider>
      <Button type="submit" width={'xl'} marginY={'4'}>
        Submit
      </Button>
    </form>
  );
}

const formFields: {
  name: keyof ContactFormSchema;
  label: string;
  type: InputProps['type'];
  placeholder: string;
  errorMessage: string;
}[] = [
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    placeholder: 'john@doe.cz',
    errorMessage: 'Email is required',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    placeholder: '+420777666555',
    errorMessage: 'Phone is required',
  },
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'John',
    errorMessage: 'Name is required',
  },
  {
    name: 'surname',
    label: 'Surname',
    type: 'text',
    placeholder: 'Doe',
    errorMessage: 'Surname is required',
  },
  {
    name: 'message',
    label: 'Message',
    type: 'text',
    placeholder: 'Tell us your message',
    errorMessage: 'Username is required',
  },
];
