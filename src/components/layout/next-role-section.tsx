import { Manrope, Rethink_Sans } from "next/font/google";
import Link from "next/link";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-rethink-sans",
});

/**
 * Closing call-to-action shown above the footer.
 * The dome line-art is used as a mask so it picks up the violet gradient
 * instead of the flat black of the source image.
 */
export function NextRoleSection() {
  return (
    <section
      aria-labelledby="next-role-heading"
      className={`${manrope.variable} ${rethinkSans.variable} relative isolate overflow-hidden bg-[#010103] [font-family:var(--font-manrope),ui-sans-serif,system-ui]`}
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-x-0 top-0 h-[964px] bg-gradient-to-b from-[#8a83ff] via-[#4b45c9]/70 to-transparent opacity-50"
          style={{
            maskImage: "url('/images/cta-bg.png')",
            WebkitMaskImage: "url('/images/cta-bg.png')",
            maskSize: "cover",
            WebkitMaskSize: "cover",
            maskPosition: "top center",
            WebkitMaskPosition: "top center",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />

        {/* Fades the dome into the page background toward the footer */}
        <div className="absolute inset-x-0 top-[171px] h-[838px] bg-gradient-to-b from-transparent to-[#010103]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[792px] flex-col items-center px-6 pt-24 pb-20 text-center sm:pt-32 sm:pb-24 lg:pt-[153px] lg:pb-[118px]">
        <h2
          id="next-role-heading"
          className="text-balance text-[36px] leading-[1.2] font-medium tracking-[-1.5px] text-white [font-family:var(--font-rethink-sans),ui-sans-serif] sm:text-5xl lg:text-[64px]"
        >
          Your next role is{" "}
          <br className="hidden sm:block" />
          already looking for you
        </h2>

        <p className="mt-4 text-balance text-lg leading-[1.6] text-white sm:text-xl">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-12 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:justify-center">
          <Link
            href="/sign-up"
            className="inline-flex h-[58px] w-full items-center justify-center rounded-xl border border-[#090a15] bg-white px-6 text-[18px] leading-[1.45] font-semibold text-[#0b0b14] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] transition-colors hover:bg-white/90 sm:w-auto"
          >
            Create a free account
          </Link>

          <Link
            href="/pricing"
            className="inline-flex h-[58px] w-full items-center justify-center rounded-xl border border-[#d7d7d7] bg-[#0e0b16] px-6 text-[18px] leading-[1.45] font-medium text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.2)] transition-colors hover:bg-[#151022] sm:w-auto"
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
