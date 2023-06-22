import { Text, Center } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
//import { Redirection } from '.';

export const LinkView = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <Center>
        <Text>No ID for redirect provided</Text>
      </Center>
    );
  }

  //return <Redirection id={id} />;
  return <></>;
};
