// src/components/FraudForm.js
"use client";

import { useState } from "react";

export default function FraudForm() {
  const [features, setFeatures] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert comma-separated features to an array of numbers
    const featureArray = features
      .split(",")
      .map((item) => parseFloat(item.trim()));

    const response = await fetch("/api/initiate-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 100, // example amount
        currency: "INR",
        features: featureArray,
      }),
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div>
      <h2>Test Fraud Detection & Payment Initiation</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter features (comma separated):
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="e.g., 3,2000,1500,500"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {result && (
        <div>
          {result.order ? (
            <>
              <h3>Payment Order Created</h3>
              <p>Order ID: {result.order.id}</p>
              <p>Fraud Check: {result.fraudResult.prediction}</p>
            </>
          ) : (
            <p>{result.message}</p>
          )}
        </div>
      )}
    </div>
  );
}
