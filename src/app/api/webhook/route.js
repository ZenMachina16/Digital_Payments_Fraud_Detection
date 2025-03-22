// src/app/api/webhook/route.js
export async function POST(request) {
  const payload = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  // TODO: Validate the webhook signature using your webhook secret

  console.log("Webhook payload:", payload);

  return new Response(JSON.stringify({ message: "Webhook received" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
