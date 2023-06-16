import { Box } from '@chakra-ui/react';
import { Element } from 'react-scroll';
import { Navbar } from '../../common/navbar';
import SignUp from './components/SignUp';
import Contact from './components/Contact';
import About from './components/About';
export function Home() {
  return (
    <Box>
      <Navbar></Navbar>
      <Box boxShadow="1px 2px 4px rgba(0, 0, 0, 1)">
        <Element name="home" className="element">
          <SignUp></SignUp>
        </Element>
        <Element name="about" className="element">
          <About></About>
        </Element>
        <Element name="shortenpath" className="element">
          <div style={{ height: '1000px', backgroundColor: '#8458b3' }}></div>
        </Element>
        <Element name="contact" className="element">
          <Contact></Contact>
        </Element>
      </Box>
    </Box>
  );
}
