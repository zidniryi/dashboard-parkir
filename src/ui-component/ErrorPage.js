import React from 'react';
import {Box, Typography} from '@mui/material';
import {purple} from '@mui/material/colors';

const primary = purple[500]; // #f44336

export default function ErrorPage({errorMessage}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: primary
      }}
    >
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Error.svg/1200px-Error.svg.png" alt="error" width={200} />
      <Typography variant="h1" style={{color: 'white'}}>
        Something Went Wrong
      </Typography>
      <Typography variant="h2" style={{color: 'white'}}>
        {errorMessage}
      </Typography>
    </Box>
  );
}
