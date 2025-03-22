"use client"
import React, { useState } from "react";

export default function FraudForm() {
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [oldBalance, setOldBalance] = useState("");
  const [newBalance, setNewBalance] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Map transaction types to numerical values (model expects numbers)
    const typeMapping = {
      CASH_OUT: 1,
      CASH_IN: 2,
      PAYMENT: 3,
      DEBIT: 4,
      TRANSFER: 5,
    };

    const features = [
      typeMapping[transactionType],
      parseFloat(amount),
      parseFloat(oldBalance),
      parseFloat(newBalance),
    ];

    try {
      const response = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: "INR",
          features,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult({ message: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="fraud-form-container">
      <h2>Fraud Detection Test</h2>
      <form onSubmit={handleSubmit} className="fraud-form">
        <div className="form-group">
          <label htmlFor="transactionType">Transaction Type:</label>
          <select
            id="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="CASH_OUT">CASH_OUT</option>
            <option value="CASH_IN">CASH_IN</option>
            <option value="PAYMENT">PAYMENT</option>
            <option value="DEBIT">DEBIT</option>
            <option value="TRANSFER">TRANSFER</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="oldBalance">Old Balance:</label>
          <input
            type="number"
            id="oldBalance"
            value={oldBalance}
            onChange={(e) => setOldBalance(e.target.value)}
            placeholder="Enter old balance"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newBalance">New Balance:</label>
          <input
            type="number"
            id="newBalance"
            value={newBalance}
            onChange={(e) => setNewBalance(e.target.value)}
            placeholder="Enter new balance"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {result && (
        <div className="result">
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
      <style jsx>{`
        .fraud-form-container {
          max-width: 500px;
          margin: 2rem auto;
          padding: 1.5rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          background: #f9f9f9;
        }
        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .fraud-form .form-group {
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column;
        }
        .fraud-form label {
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        .fraud-form input,
        .fraud-form select {
          padding: 0.5rem;
          border: 1px solid #aaa;
          border-radius: 4px;
        }
        .submit-button {
          padding: 0.7rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          width: 100%;
          margin-top: 1rem;
        }
        .submit-button:hover {
          background-color: #005bb5;
        }
        .result {
          margin-top: 1.5rem;
          padding: 1rem;
          background: #e0ffe0;
          border: 1px solid #00a000;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
