
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import Medications from './components/Medications';
import Organization from './components/Organization';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <Medications/> */}
      <Organization/>

    </ThemeProvider>
  );
}

export default App;

