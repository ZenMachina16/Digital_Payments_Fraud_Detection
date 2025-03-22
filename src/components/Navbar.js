// src/components/Navbar.js
import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Fraud Detection App
        </Typography>
        <Button color="inherit">
          <Link href="/" passHref>
            Home
          </Link>
        </Button>
        <Button color="inherit">
          <Link href="/ai" passHref>
            AI
          </Link>
        </Button>
        <Button color="inherit">
          <Link href="/blockchain" passHref>
            Blockchain
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
