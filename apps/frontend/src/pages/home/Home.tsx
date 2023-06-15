import { Box } from '@chakra-ui/react';
import { Element } from 'react-scroll';
import { Navbar } from '../../common/navbar';
export function Home() {
  return (
    <Box>
      <Navbar></Navbar>
      <Box boxShadow="1px 2px 4px rgba(0, 0, 0, 1)">
        <Element name="home" className="element">
          <div style={{ height: '1000px', backgroundColor: '#e5eaf5' }}></div>
        </Element>
        <Element name="about" className="element">
          <div style={{ height: '1000px', backgroundColor: '#a0d2eb' }}></div>
        </Element>
        <Element name="contact" className="element">
          <div style={{ height: '1000px', backgroundColor: '#494d5f' }}></div>
        </Element>
        <Element name="shortenpath" className="element">
          <div style={{ height: '1000px', backgroundColor: '#8458b3' }}></div>
        </Element>
      </Box>
    </Box>
  );
}
