"use client";

import Image from "next/image";
import Link from "next/link";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "cn";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const inputClasses =
  "h-11 w-full rounded-xl border-white/10 bg-white/5 px-4 text-base text-white placeholder:text-white/40 focus-visible:border-[#5c53fe] focus-visible:ring-[#5c53fe]/30";

export function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.16-3.16A11 11 0 0 0 2.18 7.06L5.84 9.9c.87-2.6 3.3-4.52 6.16-4.52Z"
        fill="#EA4335"
      />
    </svg>
  );
}

/**
 * Google sign-in button, shared by both auth pages.
 * The click handler is passed in so each form can wire its own logic.
 */
export function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className="mt-8 h-11 w-full rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
    >
      <GoogleLogo />
      Continue with Google
    </Button>
  );
}

/** Sign in / Sign up segmented toggle linking between the two pages. */
export function AuthTabs({ active }: { active: "sign-in" | "sign-up" }) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
      <Link
        href="/sign-in"
        aria-current={active === "sign-in" ? "page" : undefined}
        className={cn(
          "rounded-lg py-2 text-center text-sm font-medium transition-colors",
          active === "sign-in"
            ? "bg-[#5c53fe] text-white"
            : "text-white/60 hover:text-white"
        )}
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        aria-current={active === "sign-up" ? "page" : undefined}
        className={cn(
          "rounded-lg py-2 text-center text-sm font-medium transition-colors",
          active === "sign-up"
            ? "bg-[#5c53fe] text-white"
            : "text-white/60 hover:text-white"
        )}
      >
        Sign Up
      </Link>
    </div>
  );
}

/** Labelled form field with an inline validation message slot. */
export function AuthField({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label htmlFor={htmlFor} className="text-sm font-medium text-white/80">
        {label}
      </label>
      {children}
      <p
        id={`${htmlFor}-error`}
        className={cn("min-h-4 text-xs text-red-400", !error && "sr-only")}
        role="alert"
      >
        {error}
      </p>
    </div>
  );
}

/** "or continue with email" divider between the social and email sections. */
export function AuthDivider() {
  return (
    <div className="my-6 flex items-center gap-4">
      <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
      <span className="text-xs text-white/40">or continue with email</span>
      <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
    </div>
  );
}

/**
 * Shared page frame for the auth routes: ambient purple glows on the dark
 * stage, the HireLoop logo, and the centered form passed as children.
 */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${manrope.variable} relative isolate flex min-h-svh flex-col items-center overflow-hidden bg-[#010103] px-4 py-10 font-sans sm:px-6`}
      style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui" }}
    >
      {/* ambient purple glows, consistent with the landing hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#5c53fe]/20 to-transparent" />
        <div className="absolute top-1/3 left-1/2 size-[480px] -translate-x-1/2 rounded-full bg-[#5c53fe]/15 blur-[130px] sm:size-[560px]" />
        <div className="absolute bottom-[-180px] left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-[#5c53fe]/10 blur-[120px]" />
      </div>

      <Link
        href="/"
        className="relative z-10 inline-flex items-center"
        aria-label="HireLoop home"
      >
        <Image
          src="/images/logo.png"
          alt="HireLoop"
          width={154}
          height={44}
          className="h-8 w-auto"
        />
      </Link>

      <main className="relative z-10 flex w-full flex-1 items-center justify-center py-10">
        {children}
      </main>
    </div>
  );
}
