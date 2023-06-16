import {
  Container,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
} from '@chakra-ui/react';
import BoxItem from './BoxItem';

export default function About() {
  return (
    <BoxItem color={'#a0d2eb'}>
      <Grid>
        <GridItem>
          <Heading size={'2xl'} color={'white'}>
            Shorten. Analyze. Optimize.
          </Heading>
        </GridItem>
        <Spacer height={'12'}></Spacer>
        <GridItem>
          <Container
            bgColor={'whiteAlpha.500'}
            padding={'10'}
            borderRadius={'2xl'}
          >
            <Heading size={'lg'}>
              Welcome to our Analytical URL Shortener!
            </Heading>
            <Text>
              Inspired by Bitly, our platform offers powerful URL shortening and
              advanced analytics. Transform long URLs into concise links, share
              them across channels, and gain valuable insights into link
              performance. Track clicks, analyze geographic data, monitor
              referral sources, and optimize campaigns with our comprehensive
              analytics dashboard. Trust in the security and reliability of our
              platform.
            </Text>
            <Heading size={'md'}>
              Join us to shorten, analyze, and optimize your links effortlessly.
            </Heading>
          </Container>
        </GridItem>
      </Grid>
    </BoxItem>
  );
}
