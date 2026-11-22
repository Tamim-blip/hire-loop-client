"use client";

import { useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";

import { toastInfo } from "@/lib/toast";

export function PayButton({ amount }: { amount: string }) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handlePay = async () => {
    setIsRedirecting(true);

    try {
      // TODO: Create a Stripe Checkout Session and redirect to its URL.
      // const { url } = await createCheckoutSession({ plan: "pro" });
      // window.location.href = url;
      toastInfo(
        "Stripe checkout coming soon",
        "This button will take you to Stripe once checkout is connected."
      );
    } finally {
      setIsRedirecting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePay}
      disabled={isRedirecting}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
    >
     
          <LockKeyhole className="size-4" />
          Pay {amount}
          <ArrowRight className="size-4" />
    </button>
  );
}
