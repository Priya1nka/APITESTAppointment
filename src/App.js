
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppointmentForm from './components/AppointmentForm';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppointmentForm/>
    </ThemeProvider>
  );
}

export default App;

