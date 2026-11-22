
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function paymentVerify(sessionId: string) {
  if (!BASE_URL) {
    throw new Error("API base URL is not configured");
  }

  const res = await fetch(
    `${BASE_URL}/payment/checkout-verify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(
      data.message || "Payment verification failed"
    );
  }

  return data;
}
