// src/app/layout.js
import '../styles/globals.css';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Fraud Detection App</title>
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
