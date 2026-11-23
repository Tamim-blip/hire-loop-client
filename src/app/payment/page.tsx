import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { getSession } from "@/lib/core/server";

export const metadata: Metadata = {
  title: "Payment | HireLoop",
  description: "Choose the HireLoop plan that fits the way you work.",
};

type PaymentPlan = {
  roleLabel: string;
  name: string;
  price: number;
  priceSuffix: string;
  billingCycle: string;
  badge: string;
  description: string;
  features: string[];
  note: string;
  icon: LucideIcon;
  heading: string;
  subheading: string;
  backHref: string;
  backLabel: string;
  accent: {
    glow: string;
    icon: string;
    badge: string;
    check: string;
    button: string;
  };
};

const SEEKER_PLAN: PaymentPlan = {
  roleLabel: "Job seeker plan",
  name: "Job Seeker Pro",
  price: 9.99,
  priceSuffix: "per month",
  billingCycle: "Monthly",
  badge: "Most popular",
  description: "Apply without limits and keep your job search moving.",
  features: [
    "Unlimited job applications",
    "Priority application review",
    "Real-time application tracking",
    "Cancel anytime",
  ],
  note: "Your plan starts immediately after payment. You can cancel at any time from your dashboard and keep access until the end of the billing period.",
  icon: Sparkles,
  heading: "Complete your payment",
  subheading: "Unlock unlimited applications and keep your job search moving.",
  backHref: "/browse-jobs",
  backLabel: "Back to jobs",
  accent: {
    glow: "bg-[radial-gradient(ellipse_at_top,_rgba(52,211,153,0.12),_transparent_65%)]",
    icon: "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
    badge: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    check: "border-emerald-400/20 bg-emerald-400/10 text-emerald-400",
    button: "bg-emerald-400 text-emerald-950 hover:bg-emerald-300",
  },
};

const RECRUITER_PLAN: PaymentPlan = {
  roleLabel: "Recruiter plan",
  name: "Recruiter Pro",
  price: 79,
  priceSuffix: "one-time",
  billingCycle: "One-time",
  badge: "For hiring teams",
  description: "Post more roles, reach more candidates, and hire faster.",
  features: [
    "Unlimited job postings",
    "Featured listings for more visibility",
    "Applicant management tools",
    "Priority support",
  ],
  note: "Your recruiter workspace unlocks immediately after payment. This is a one-time payment with no recurring charges.",
  icon: BriefcaseBusiness,
  heading: "Power up your hiring",
  subheading:
    "Publish more roles, reach more candidates, and manage applicants in one place.",
  backHref: "/dashboard/recruiter",
  backLabel: "Back to dashboard",
  accent: {
    glow: "bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.14),_transparent_65%)]",
    icon: "border-violet-400/20 bg-violet-400/10 text-violet-300",
    badge: "border-violet-400/20 bg-violet-400/10 text-violet-300",
    check: "border-violet-400/20 bg-violet-400/10 text-violet-300",
    button: "bg-violet-600 text-white hover:bg-violet-500",
  },
};

const PaymentPage = async () => {
  const session = await getSession();

  // Only seekers and recruiters can check out.
  const plan =
    session?.user?.role === "recruiter" ? RECRUITER_PLAN : SEEKER_PLAN;

  const price = `$${plan.price.toFixed(2)}`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-72 ${plan.accent.glow}`}
      />

      <div className="relative mx-auto w-full max-w-5xl">
        <Link
          href={plan.backHref}
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          {plan.backLabel}
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {plan.heading}
            </h1>
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${plan.accent.badge}`}
            >
              {plan.roleLabel}
            </span>
          </div>
          <p className="mt-2 text-sm text-zinc-400">{plan.subheading}</p>
        </header>

        <Steps checkClassName={plan.accent.check} />

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
          <PlanDetails plan={plan} price={price} />
          <OrderSummary plan={plan} price={price} />
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-zinc-600">
          By continuing you agree to our Terms of Service and Privacy Policy.
          Your payment is processed securely by Stripe.
        </p>
      </div>
    </main>
  );
};

function Steps({ checkClassName }: { checkClassName: string }) {
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
                ? `flex size-6 items-center justify-center rounded-full border ${checkClassName}`
                : step.state === "current"
                  ? "flex size-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-black"
                  : "flex size-6 items-center justify-center rounded-full border border-white/10 text-xs font-medium text-zinc-500"
            }
          >
            {step.state === "done" ? <Check className="size-3.5" /> : index + 1}
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

function PlanDetails({ plan, price }: { plan: PaymentPlan; price: string }) {
  const Icon = plan.icon;

  return (
    <section className="rounded-xl border border-white/[0.08] bg-[#151518] p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl border ${plan.accent.icon}`}
          >
            <Icon className="size-5" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight">
                {plan.name}
              </h2>
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${plan.accent.badge}`}
              >
                {plan.badge}
              </span>
            </div>
            <p className="mt-1 text-sm text-zinc-400">{plan.description}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-semibold tracking-tight">{price}</p>
          <p className="text-xs text-zinc-500">{plan.priceSuffix}</p>
        </div>
      </div>

      <div className="my-6 border-t border-white/[0.07]" />

      <h3 className="text-sm font-medium text-zinc-200">What is included</h3>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-zinc-400"
          >
            <span
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border ${plan.accent.check}`}
            >
              <Check className="size-3" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-white/[0.06] bg-[#101012] p-4">
        <BadgeCheck className="mt-0.5 size-4 shrink-0 text-zinc-400" />
        <p className="text-xs leading-5 text-zinc-500">{plan.note}</p>
      </div>
    </section>
  );
}

function OrderSummary({ plan, price }: { plan: PaymentPlan; price: string }) {
  return (
    <aside className="h-fit rounded-xl border border-white/[0.08] bg-[#151518] p-5 sm:p-6 lg:sticky lg:top-8">
      <h2 className="text-lg font-semibold tracking-tight">Order summary</h2>

      <div className="mt-5 space-y-3 text-sm">
        <SummaryRow label={plan.name} value={price} />
        <SummaryRow label="Billing cycle" value={plan.billingCycle} />
        <SummaryRow label="Tax" value="$0.00" />
      </div>

      <div className="my-5 border-t border-white/[0.07]" />

      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm text-zinc-400">Total due today</span>
        <span className="text-xl font-semibold tracking-tight">{price}</span>
      </div>

      <form action="/api/checkout_sessions" method="POST" className="mt-5">
        <button
          type="submit"
          className={`flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${plan.accent.button}`}
        >
          <LockKeyhole className="size-4" />
          Pay {price}
          <ArrowRight className="size-4" />
        </button>
      </form>

      <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-zinc-500">
        <LockKeyhole className="mt-0.5 size-3.5 shrink-0" />
        <span>
          You will be redirected to Stripe to complete your payment securely.
          HireLoop never stores your card details.
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
