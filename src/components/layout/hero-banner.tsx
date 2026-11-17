
import Image from "next/image";
import { Manrope, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import Link from "next/link";
import {
  SearchIcon,
  StarIcon,
  TrendingUpIcon,
  UserRoundSearchIcon,
} from "lucide-react";

import { HeroSearchBar } from "@/components/layout/hero-search-bar";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const TRENDING_POSITIONS = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

const STATS = [
  { value: "50K", label: "Active Jobs", icon: SearchIcon },
  { value: "12K", label: "Companies", icon: TrendingUpIcon },
  { value: "2M", label: "Job Seekers", icon: UserRoundSearchIcon },
  { value: "97%", label: "Satisfaction Rate", icon: StarIcon },
] as const;

/* Hero announcement badge */
function HeroBadge() {
  return (
    <div className="flex items-center">
      <span
        aria-hidden="true"
        className="hidden h-px w-16 bg-gradient-to-r from-[#010123] via-[#575757] to-[#a8a8a8]/70 lg:block"
      />

      <div className="flex items-center gap-4 rounded-full border border-white/25 bg-gradient-to-b from-[#474747] to-[#010102] px-6 py-3">
        <span aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 text-amber-400"
          >
            <rect x="2.5" y="7.5" width="19" height="13" rx="2.5" />
            <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
            <path d="m10 12.5-1.8 1.7 1.8 1.7" />
            <path d="m14 12.5 1.8 1.7-1.8 1.7" />
          </svg>
        </span>

        <span className="[font-family:var(--font-space-mono),monospace] text-sm text-white sm:text-lg">
          50,000+ new jobs this month
        </span>
      </div>

      <span
        aria-hidden="true"
        className="hidden h-px w-16 bg-gradient-to-l from-[#010123] via-[#575757] to-[#a8a8a8]/70 lg:block"
      />
    </div>
  );
}

/* Statistics section */
function StatsRow() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 pb-20">
      <h2 className="mx-auto max-w-[680px] text-balance text-center text-2xl font-medium text-white sm:text-3xl lg:text-[40px] lg:leading-[1.3]">
        Assisting over 15,000 job seekers find their dream positions.
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ value, label, icon: Icon }) => (
          <div
            key={label}
            className="flex h-64 flex-col justify-between rounded-2xl bg-gradient-to-br from-[#010102] to-[#313131] p-6 sm:h-auto sm:min-h-52 lg:h-[254px]"
          >
            <Icon className="size-6 text-white" />

            <div>
              <p className="[font-family:var(--font-plus-jakarta),sans-serif] text-5xl font-semibold leading-none text-white lg:text-[56px]">
                {value}
              </p>

              <p className="mt-4 text-lg text-white">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Main Hero Banner */
export function HeroBanner() {
  return (
    <section
      className={`${manrope.variable} ${spaceMono.variable} ${plusJakarta.variable} relative isolate overflow-hidden bg-[#010103] [font-family:var(--font-manrope),ui-sans-serif,system-ui]`}
    >
      {/* Background layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Top purple ambient glow */}
        <div className="absolute inset-x-0 top-0 h-[52%] bg-gradient-to-b from-[#5c53fe]/20 via-[#5c53fe]/8 to-transparent" />

        {/* Globe horizon glow */}
        <div className="absolute bottom-[180px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#5c53fe]/30 blur-[130px] sm:bottom-[100px] sm:h-[680px] sm:w-[680px]" />

        {/* Responsive globe image */}
        <div
          className="
            absolute
            bottom-0
            left-1/2
            w-[130%]
            max-w-none
            -translate-x-1/2
            sm:w-[100%]
            sm:max-w-[1240px]
            lg:bottom-[-100px]
          "
        >
          <Image
            src="/images/globe-hero.png"
            alt=""
            width={1440}
            height={1882}
            priority
            sizes="(max-width: 640px) 130vw, (max-width: 1024px) 100vw, 1240px"
            className="block h-auto w-full"
          />
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[784px] flex-col items-center px-6 pt-36 pb-10 text-center sm:pt-[210px]">
        <HeroBadge />

        <h1 className="mt-8 text-balance text-4xl font-bold text-white sm:text-5xl lg:text-[56px] lg:leading-[1.15] lg:tracking-[-0.02em]">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 max-w-[784px] text-balance text-lg text-white/70 lg:text-xl lg:leading-[1.6]">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search and trending positions */}
        <div className="mt-12 w-full">
          <HeroSearchBar />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <span className="text-base text-white/70">
              Trending Position
            </span>

            {TRENDING_POSITIONS.map((position) => (
              <Link
                key={position}
                href={`#/jobs?q=${encodeURIComponent(position)}`}
                className="rounded-full border border-white/10 bg-[#1a1a1b] px-3 py-1.5 text-sm text-white transition-colors hover:bg-[#242425]"
              >
                {position}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Spacing for globe background */}
      <div
        className="relative z-10 mt-24 h-[180px] sm:mt-0 sm:h-[350px]"
        aria-hidden="true"
      />

      {/* Statistics */}
      <StatsRow />
    </section>
  );
}
