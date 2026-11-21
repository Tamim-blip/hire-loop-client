import Link from "next/link";
import { Banknote, Bookmark, Briefcase, CircleCheck, CircleX } from "lucide-react";

import type { ApiJob } from "@/lib/job";

type JobCardProps = {
  job: ApiJob;
  href: string;
};



function formatAmount(value: string) {
  const amount = Number(value);

  if (!Number.isFinite(amount) || amount <= 0) return null;

  if (amount >= 1000) {
    const compact = amount / 1000;
    return `$${Number.isInteger(compact) ? compact : compact.toFixed(1)}k`;
  }

  return `$${amount}`;
}

function formatSalary(job: ApiJob) {
  const min = job.minSalary ? formatAmount(job.minSalary) : null;
  const max = job.maxSalary ? formatAmount(job.maxSalary) : null;

  if (min && max) return `${min} - ${max}`;
  if (min) return `From ${min}`;
  if (max) return `Up to ${max}`;

  return null;
}

function formatLocation(job: ApiJob) {
  if (!job.location) return "";
  return job.isRemote ? `${job.location} (Remote)` : job.location;
}

export function JobCard({ job, href }: JobCardProps) {
  const salary = formatSalary(job);
  const location = formatLocation(job);
  const meta = [job.company, location].filter(Boolean).join(" • ");
  const isActive = job.status === "Active";

  return (
    <article className="flex gap-4 rounded-xl border border-white/[0.07] bg-[#141418] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.035)] sm:gap-5 sm:p-6">
      {/* Company avatar */}
     

      <div className="flex min-w-0 flex-1 flex-col gap-4 sm:gap-6">
        {/* Title + company */}
        <div className="flex items-start justify-between gap-4">
          <Link href={href} className="block min-w-0 flex-1">
            <h3 className="truncate text-lg leading-7 font-semibold tracking-[-0.018em] text-[#ededef] sm:text-[22px]">
              {job.title}
            </h3>

            <p className="mt-2 truncate text-[13px] leading-5 tracking-[-0.005em] text-[#6e6e78]">
              {meta}
            </p>
          </Link>

          <button
            type="button"
            aria-label={`Save ${job.title}`}
            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-[#8e9192] transition-colors hover:bg-white/5 hover:text-[#ededef]"
          >
            <Bookmark className="size-[18px]" />
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-3">
          {salary && (
            <span className="inline-flex h-[30px] items-center gap-2 rounded-lg border border-white/10 bg-[#1a1a1f] px-3 text-[13px] leading-5 font-medium tracking-[-0.005em] text-[#ededef]">
              <Banknote className="size-3.5 text-[#e5e2e3]" />
              {salary}
            </span>
          )}

          <span className="inline-flex h-[30px] items-center gap-2 rounded-lg border border-white/10 bg-[#1a1a1f] px-3 text-[13px] leading-5 font-medium tracking-[-0.005em] text-[#ededef]">
            <Briefcase className="size-3.5 text-[#e5e2e3]" />
            {job.jobType}
          </span>

          {job.status && (
            <span
              className={
                isActive
                  ? "inline-flex h-[30px] items-center gap-2 rounded border border-[#22c55e]/30 bg-[#22c55e]/10 px-3 text-[13px] leading-5 font-medium tracking-[-0.005em] text-[#22c55e]"
                  : "inline-flex h-[30px] items-center gap-2 rounded border border-red-500/30 bg-red-500/10 px-3 text-[13px] leading-5 font-medium tracking-[-0.005em] text-red-400"
              }
            >
              {isActive ? (
                <CircleCheck className="size-3.5" />
              ) : (
                <CircleX className="size-3.5" />
              )}
              {job.status}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
