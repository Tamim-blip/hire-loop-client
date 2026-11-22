import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { PayButton } from "./_components/pay-button";

export const metadata: Metadata = {
  title: "Payment | HireLoop",
  description: "Upgrade to Job Seeker Pro and apply without limits.",
};

const PLAN = {
  name: "Job Seeker Pro",
  price: 9.99,
  cadence: "month",
  description: "Apply without limits and keep your job search moving.",
  features: [
    "Unlimited job applications",
    "Priority application review",
    "Real-time application tracking",
    "Cancel anytime",
  ],
};

const price = `$${PLAN.price.toFixed(2)}`;

const PaymentPage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b] px-4 py-8 text-white sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,_rgba(52,211,153,0.10),_transparent_65%)]" />

      <div className="relative mx-auto w-full max-w-5xl">
        <Link
          href="/browse-jobs"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to jobs
        </Link>

        <header className="mt-6">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Complete your payment
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Unlock unlimited applications and keep your job search moving.
          </p>
        </header>

        <Steps />

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* Plan details */}
          <section className="rounded-xl border border-white/[0.08] bg-[#151518] p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
                  <Sparkles className="size-5 text-emerald-400" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold tracking-tight">
                      {PLAN.name}
                    </h2>
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-300">
                      Most popular
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">
                    {PLAN.description}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-semibold tracking-tight">
                  {price}
                </p>
                <p className="text-xs text-zinc-500">
                  per {PLAN.cadence}
                </p>
              </div>
            </div>

            <div className="my-6 border-t border-white/[0.07]" />

            <h3 className="text-sm font-medium text-zinc-200">
              What is included
            </h3>

            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {PLAN.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-zinc-400"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                    <Check className="size-3 text-emerald-400" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-start gap-3 rounded-lg border border-white/[0.06] bg-[#101012] p-4">
              <BadgeCheck className="mt-0.5 size-4 shrink-0 text-zinc-400" />
              <p className="text-xs leading-5 text-zinc-500">
                Your plan starts immediately after payment. You can cancel at
                any time from your dashboard and keep access until the end of
                the billing period.
              </p>
            </div>
          </section>

          {/* Order summary + pay */}
          <aside className="h-fit rounded-xl border border-white/[0.08] bg-[#151518] p-5 sm:p-6 lg:sticky lg:top-8">
            <h2 className="text-lg font-semibold tracking-tight">
              Order summary
            </h2>

            <div className="mt-5 space-y-3 text-sm">
              <SummaryRow label={PLAN.name} value={price} />
              <SummaryRow label="Billing cycle" value={`Monthly`} />
              <SummaryRow label="Tax" value="$0.00" />
            </div>

            <div className="my-5 border-t border-white/[0.07]" />

            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm text-zinc-400">Total due today</span>
              <span className="text-xl font-semibold tracking-tight">
                {price}
              </span>
            </div>

            <div className="mt-5">
              <PayButton amount={price} />
            </div>

            <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-zinc-500">
              <LockKeyhole className="mt-0.5 size-3.5 shrink-0" />
              <span>
                You will be redirected to Stripe to complete your payment
                securely. HireLoop never stores your card details.
              </span>
            </div>

            <div className="mt-5 border-t border-white/[0.07] pt-5">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <CreditCard className="size-4" />
                <span>Visa</span>
                <span className="text-zinc-700">•</span>
                <span>Mastercard</span>
                <span className="text-zinc-700">•</span>
                <span>Amex</span>
                <span className="text-zinc-700">•</span>
                <span>Apple Pay</span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                <ShieldCheck className="size-4" />
                Secured by Stripe
              </div>
            </div>
          </aside>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-zinc-600">
          By continuing you agree to our Terms of Service and Privacy Policy.
          Your payment is processed securely by Stripe.
        </p>
      </div>
    </main>
  );
};

function Steps() {
  const steps = [
    { label: "Choose plan", state: "done" },
    { label: "Payment", state: "current" },
    { label: "Confirmation", state: "upcoming" },
  ] as const;

  return (
    <ol className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
      {steps.map((step, index) => (
        <li key={step.label} className="flex items-center gap-3">
          <span
            className={
              step.state === "done"
                ? "flex size-6 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                : step.state === "current"
                  ? "flex size-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-black"
                  : "flex size-6 items-center justify-center rounded-full border border-white/10 text-xs font-medium text-zinc-500"
            }
          >
            {step.state === "done" ? (
              <Check className="size-3.5" />
            ) : (
              index + 1
            )}
          </span>

          <span
            className={
              step.state === "upcoming"
                ? "text-sm text-zinc-500"
                : "text-sm text-zinc-200"
            }
          >
            {step.label}
          </span>

          {index < steps.length - 1 && (
            <span className="hidden h-px w-10 bg-white/10 sm:block" />
          )}
        </li>
      ))}
    </ol>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-zinc-400">{label}</span>
      <span className="text-zinc-200">{value}</span>
    </div>
  );
}

export default PaymentPage;
