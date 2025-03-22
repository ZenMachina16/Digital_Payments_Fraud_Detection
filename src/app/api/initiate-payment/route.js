// src/app/api/initiate-payment/route.js
import Razorpay from "razorpay";

export async function POST(request) {
  const body = await request.json();
  const { amount, currency, features } = body;

  // Call the fraud detection microservice
  const fraudResponse = await fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features }),
  });
  const fraudResult = await fraudResponse.json();

  // If the prediction indicates fraud, block the transaction
  if (fraudResult.prediction === "Fraud") {
    return new Response(
      JSON.stringify({
        message: "High risk transaction. Please verify further.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // If not fraud, proceed to create a Razorpay order
  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount * 100, // Convert to smallest currency unit (e.g., paise)
    currency,
    receipt: `receipt_order_${Date.now()}`,
  };

  let order;
  try {
    order = await razorpayInstance.orders.create(options);
  } catch (error) {
    return new Response(JSON.stringify({ message: "Order creation failed." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ order, fraudResult }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
