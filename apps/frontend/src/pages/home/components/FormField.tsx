import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { FieldValues, FieldValue, FieldErrors } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues = FieldValues>
  extends InputProps {
  label: string;
  name: FieldValue<T>;
  errors: FieldErrors<T>;
}

export default React.forwardRef(
  ({ label, errors, ...props }: FormFieldProps, ref) => (
    <FormControl
      padding="1"
      textAlign="center"
      isInvalid={!!errors[props.name]?.message}
    >
      <Heading size={[null, 'md', 'md']}>{label}</Heading>
      <Input {...props} ref={ref} marginY={'3'} />
      <FormErrorMessage fontSize="sm" color="red">
        {errors[props.name]?.message as string}
      </FormErrorMessage>
    </FormControl>
  )
);
