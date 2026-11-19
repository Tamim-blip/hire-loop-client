"use client";


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import Image from "next/image";
import Link from "next/link";
import { LogOutIcon, MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";
import { signOut, useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";



function getInitials(name?: string | null) {
  return (
    name
      ?.split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U"
  );
}



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
  const { data: session } = useSession();
  const user = session?.user;


  const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
  { label: "Dashboard", href: `/dashboard/${user?.role}` },
] as const;


  const initials = getInitials(user?.name);

  const HandleSignOut = () => {
    signOut()
    redirect('/')
  }

  return (
    <nav
      aria-label="Main"
      className="hidden items-center gap-2 md:flex"
    >
      {NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          {link.label}
        </Link>
      ))}

      {/* vertical divider before auth actions */}
      <span
        aria-hidden="true"
        className="mx-2 h-5 w-px bg-foreground/15"
      />

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open account menu"
                className="size-10 rounded-full p-0 ring-1 ring-foreground/10 transition hover:bg-foreground/5 hover:ring-violet-400/50"
              >
                <Avatar className="size-8">
                  <AvatarImage
                    src={user.image ?? undefined}
                    alt={user.name ?? "User avatar"}
                  />
                  <AvatarFallback className="bg-violet-500/15 text-xs font-semibold text-violet-300">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            }
          />
          <DropdownMenuContent
            align="end"
            sideOffset={10}
            className="w-64 p-2"
          >
            <div className="flex items-center gap-3 rounded-lg px-2 py-2">
              <Avatar className="size-10">
                <AvatarImage
                  src={user.image ?? undefined}
                  alt={user.name ?? "User avatar"}
                />
                <AvatarFallback className="bg-violet-500/15 text-sm font-semibold text-violet-300">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {user.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuGroup>
              <DropdownMenuItem
              onClick={HandleSignOut}
                variant="destructive"
                className="gap-2 rounded-lg px-2 py-2"
              >
                <LogOutIcon className="size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2 pl-1">
          <Link
            href="/sign-in"
            className="rounded-full px-3.5 py-2 text-sm font-medium text-violet-400 transition-colors hover:bg-violet-400/10 hover:text-violet-300"
          >
            Sign In
          </Link>

          <Button
            render={<Link href="/sign-up" />}
            className="h-10 rounded-full bg-violet-600 px-6 text-white shadow-lg shadow-violet-600/20 transition-colors hover:bg-violet-500 hover:shadow-violet-500/30"
          >
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
}

function MobileNav() {
  const { data: session } = useSession();
  const user = session?.user;


  const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
] as const;

  const initials = getInitials(user?.name);

  const HandleSignOut = () => {
    signOut()
    redirect('/')
  }

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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="h-auto w-full min-w-0 justify-start gap-3 rounded-xl px-2 py-2 text-left"
                  >
                    <Avatar className="size-9">
                      <AvatarImage
                        src={user.image ?? undefined}
                        alt={user.name ?? "User avatar"}
                      />
                      <AvatarFallback className="text-xs font-medium">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-medium text-foreground">
                        {user.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </span>
                  </Button>
                }
              />
              <DropdownMenuContent
                align="start"
                side="top"
                sideOffset={8}
                className="w-64"
              >
                <div className="flex items-center gap-3 px-2 py-2.5">
                  <Avatar className="size-10">
                    <AvatarImage
                      src={user.image ?? undefined}
                      alt={user.name ?? "User avatar"}
                    />
                    <AvatarFallback className="text-sm font-medium">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={HandleSignOut} variant="destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
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
            </>
          )}
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
