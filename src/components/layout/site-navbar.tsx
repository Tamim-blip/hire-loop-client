"use client";


import Image from "next/image";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
] as const;

function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center"
      aria-label="HireLoop home"
    >
      <Image
        src="/images/logo.png"
        alt="HireLoop"
        width={154}
        height={44}
        priority
        className="h-8 w-auto md:h-9"
      />
    </Link>
  );
}

function DesktopNav() {
  return (
    <nav
      aria-label="Main"
      className="hidden items-center  gap-8 md:flex"
    >
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-sm font-medium text-foreground/90 transition-colors hover:text-foreground"
        >
          {link.label}
        </Link>
      ))}

      {/* vertical divider before auth actions */}
      <span
        aria-hidden="true"
        className="h-6 w-px bg-foreground/20"
      />

      <Link
        href="/sign-in"
        className="text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
      >
        Sign In
      </Link>

      <Button
        render={<Link href="/sign-up" />}
        className="h-10 rounded-full bg-violet-600 px-6 text-white hover:bg-violet-500"
      >
        Get Started
      </Button>
    </nav>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            className="md:hidden"
            aria-label="Open menu"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>

      <SheetContent className="w-72 gap-0 p-0">
        <SheetHeader className="border-b py-5">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <Logo />
        </SheetHeader>

        <nav
          aria-label="Main"
          className="flex flex-col gap-1 p-4"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/90 transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t p-4">
          <Button
            render={<Link href="/sign-in" />}
            variant="ghost"
            className="h-10 justify-center text-violet-400 hover:bg-violet-400/10 hover:text-violet-300"
          >
            Sign In
          </Button>
          <Button
            render={<Link href="/sign-up" />}
            className="h-10 rounded-full bg-violet-600 text-white hover:bg-violet-500"
          >
            Get Started
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SiteNavbar({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-4 z-40 mt-[-70px] w-full bg-transparent",
        className
      )}
    >
      <div className="mx-auto bg-purple-500/30 flex border rounded-full  h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <DesktopNav />
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
