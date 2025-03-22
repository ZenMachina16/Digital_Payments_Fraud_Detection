// src/components/FraudForm.js
"use client";

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function FraudForm() {
  const [formData, setFormData] = useState({
    amount: '',
    location: '',
    device: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace with the actual URL of your deployed AI service
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: 'Prediction failed. Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Amount"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Device"
        name="device"
        value={formData.device}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" type="submit" sx={{ mt: 2 }} disabled={loading}>
        {loading ? 'Checking...' : 'Check Fraud Risk'}
      </Button>
      {result && (
        <Box sx={{ mt: 2 }}>
          {result.error ? (
            <Typography color="error">{result.error}</Typography>
          ) : (
            <Typography>
              <strong>Fraud Risk:</strong> {result.is_fraud ? 'High Risk' : 'Low Risk'}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
