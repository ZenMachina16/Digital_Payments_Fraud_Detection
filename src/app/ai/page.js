// src/app/ai/page.js
import React from 'react';
import FraudForm from '../../components/FraudForm';

export default function AIPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>AI Fraud Detection Module</h1>
      <p>Enter transaction details below to check for potential fraud:</p>
      <FraudForm />
    </div>
  );
}
