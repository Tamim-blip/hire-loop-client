import { Inter_Tight, Manrope } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-inter-tight",
});

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/worker-ai" },
      { label: "Companies", href: "/company" },
      { label: "Salary data", href: "/salary-data" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Career library", href: "/career-library" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "/brand-guideline" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
] as const;

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 512"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 384 512"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 448 512"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    Icon: FacebookIcon,
    className: "bg-white text-[#0b0b14] hover:bg-white/90",
  },
  {
    label: "Pinterest",
    href: "#",
    Icon: PinterestIcon,
    className: "bg-[#5c53fe] text-white hover:bg-[#6f67ff]",
  },
  {
    label: "LinkedIn",
    href: "#",
    Icon: LinkedInIcon,
    className: "bg-white text-[#0b0b14] hover:bg-white/90",
  },
] as const;

/** Site footer: brand blurb, link columns and legal row from the Figma design. */
export function SiteFooter() {
  return (
    <footer
      className={`${manrope.variable} ${interTight.variable} bg-[#010103] [font-family:var(--font-manrope),ui-sans-serif,system-ui]`}
    >
      <div className="mx-auto w-full max-w-[1320px] px-6 pt-10 pb-10 min-[1440px]:px-0">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          {/* Brand */}
          <div className="max-w-[288px]">
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
                className="h-11 w-auto"
              />
            </Link>

            <p className="mt-6 text-base leading-[1.9] text-white">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:flex lg:gap-[72px]"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="lg:w-[163px]">
                <h2 className="text-[18px] leading-[1.4] font-medium text-[#5c53fe] [font-family:var(--font-inter-tight),sans-serif]">
                  {column.title}
                </h2>

                <ul className="mt-6 flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-base leading-[1.9] text-[#d0d5dd] transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Social + legal */}
        <div className="mt-[72px] flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ label, href, Icon, className }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`flex size-10 items-center justify-center rounded-lg transition-colors ${className}`}
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-base leading-[1.9] text-[#acabb2]">
            <p>Copyright 2024 —Programming Hero</p>

            <p>
              <Link
                href="/terms"
                className="transition-colors hover:text-white"
              >
                Terms &amp; Policy
              </Link>
              <span aria-hidden="true"> - </span>
              <Link
                href="/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy Guideline
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
