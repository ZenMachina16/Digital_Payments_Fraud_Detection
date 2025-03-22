// components/Layout.js
import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Fraud Detection UI</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '2rem' }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
