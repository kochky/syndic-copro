import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner() {
  return (
    <Box sx={{ display: 'flex',width:'100% ',justifyContent:"center",marginTop:'20px'}}>
      <CircularProgress size="300px"/>
    </Box>
  );
}