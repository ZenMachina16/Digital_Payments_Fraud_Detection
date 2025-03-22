// components/Home.js
import React from 'react';
import { Typography, Button } from '@mui/material';

const Home = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome to the Fraud Detection Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is a placeholder for the fraud detection system. More features coming soon!
      </Typography>
      <Button variant="contained" color="primary">
        Learn More
      </Button>
    </div>
  );
};

export default Home;
