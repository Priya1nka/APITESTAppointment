
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DiagnosisForm from './components/DiagnosisForm';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DiagnosisForm/>
    </ThemeProvider>

  );
}

export default App;

