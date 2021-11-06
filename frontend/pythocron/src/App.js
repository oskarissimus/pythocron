import React from 'react';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddPythocron from './AddPythocron';
import { Routes, Route } from "react-router-dom";
import EditPythocron from './EditPythocron';

let theme = createTheme({
  palette: {
    background: {
      default: '#eee',
    },
  },
});
theme = responsiveFontSizes(theme);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<AddPythocron />} />
        <Route path="/:pythocronId" element={<EditPythocron />} />
      </Routes>
    </ThemeProvider>
  )
}
