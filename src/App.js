import React from 'react';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import '@fontsource/poppins';

import './Style/App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';

import AnimatedRoutes from './Routes/AnimatedRoutes';

//Font Imports
import "@fontsource/poppins/600.css";
import "@fontsource/roboto";

function App() {
  const theme = extendTheme({
    fonts: {
      heading: "Poppins, sans-serif",
      body: "Roboto, sans-serif",
    },
    colors: {
      blueCTE: {
        50: "#1C62BA",
        100: "#4332FA",
        500: "#2E23AE",
        900: "#110A61",
      },
      blueGrad:
        "linear-gradient(90deg, rgba(55,48,186,1) 0%, rgba(23,165,194,1) 100%)",
      orangeCTE: "#FABC4B",
      neonCTE: "#D2FA19",
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <ProSidebarProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </ProSidebarProvider>
  </ChakraProvider>
  );
}

export default App;
