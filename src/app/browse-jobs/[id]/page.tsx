
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock3,
  MapPin,
  Wallet,
} from "lucide-react";

import { getOneJob } from "@/lib/api/jobs";
import JobHeader from "../_components/job-header";


const JobDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const data = await getOneJob(id);

  const salary = `${data.minSalary} - ${data.maxSalary} ${data.frequency}`;

  

  

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Job Header */}
      <JobHeader data = {data}></JobHeader>

        {/* Main Content */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          {/* Left Column */}
          <div className="min-w-0">
            {/* Job Overview */}
            <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <OverviewCard
                icon={<Wallet />}
                label="Salary Range"
                value={salary}
              />

              <OverviewCard
                icon={<MapPin />}
                label="Location"
                value={data.isRemote ? "Remote" : data.location}
              />

              <OverviewCard
                icon={<Clock3 />}
                label="Job Type"
                value={data.jobType}
              />

              <OverviewCard
                icon={<CalendarDays />}
                label="Deadline"
                value={data.deadline}
              />
            </section>

            {/* Job Description */}
            <section className="mt-5 rounded-xl border border-white/[0.08] bg-[#151518] p-5 sm:p-7">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Job Description
                </h2>

                <p className="mt-5 text-sm leading-7 text-zinc-400">
                  {data.responsibilities}
                </p>
              </div>

              <div className="my-6 border-t border-white/[0.07]" />

              {/* Responsibilities */}
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Responsibilities
                </h2>

                <ul className="mt-5 space-y-4">
                  <li className="flex gap-3 text-sm leading-6 text-zinc-400">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white" />
                    <span>{data.responsibilities}</span>
                  </li>

                  <li className="flex gap-3 text-sm leading-6 text-zinc-400">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white" />
                    <span>
                      Collaborate with team members to deliver quality work
                      and meet project goals.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="my-6 border-t border-white/[0.07]" />

              {/* Requirements */}
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Requirements
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  {data.category && (
                    <SkillTag>{data.category}</SkillTag>
                  )}

                  <SkillTag>{data.jobType}</SkillTag>

                  {data.isRemote && <SkillTag>Remote</SkillTag>}
                </div>

                <ul className="mt-5 space-y-3">
                  <li className="flex gap-3 text-sm leading-6 text-zinc-400">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white" />
                    <span>{data.requirements}</span>
                  </li>
                </ul>
              </div>

              <div className="my-6 border-t border-white/[0.07]" />

              {/* Additional Information */}
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Additional Information
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <InfoItem
                    icon={<Building2 />}
                    label="Company"
                    value={data.company}
                  />

                  <InfoItem
                    icon={<MapPin />}
                    label="Job Location"
                    value={data.location}
                  />

                  <InfoItem
                    icon={<CalendarDays />}
                    label="Application Deadline"
                    value={data.deadline}
                  />

                  <InfoItem
                    icon={<BriefcaseBusiness />}
                    label="Job Category"
                    value={data.category}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <aside className="h-fit rounded-xl border border-white/[0.08] bg-[#151518] p-5 sm:p-6">
            <h2 className="text-lg font-semibold tracking-tight">
              Company Overview
            </h2>

            {/* Company Image Area */}
            <div className="relative mt-5 flex h-40 items-center justify-center overflow-hidden rounded-xl border border-white/[0.04] bg-gradient-to-br from-[#172321] via-[#101a1b] to-[#08090a">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(80,120,110,0.18),_transparent_70%)]" />

              <div className="relative flex size-20 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                <Building2 className="size-10 text-zinc-500" />
              </div>

              <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
            </div>

            {/* Company Details */}
            <div className="mt-5 space-y-4">
              <CompanyRow
                label="Company"
                value={data.company}
              />

              <CompanyRow
                label="Industry"
                value={data.category}
              />

              <CompanyRow
                label="Location"
                value={data.location}
              />

              <CompanyRow
                label="Job Type"
                value={data.jobType}
              />
            </div>

            <button
              type="button"
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#202024] text-sm font-medium text-zinc-200 transition hover:bg-white/10"
            >
              Company Details
              <ArrowUpRight className="size-4" />
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
};

function OverviewCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-white/[0.08] bg-[#151518] p-4">
      <div className="text-zinc-400 [&_svg]:size-[18px]">
        {icon}
      </div>

      <p className="mt-2 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-medium text-zinc-200">
        {value}
      </p>
    </div>
  );
}

function SkillTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-white/[0.08] bg-[#202024] px-3 py-1.5 text-xs text-zinc-300">
      {children}
    </span>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-zinc-500 [&_svg]:size-4">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-zinc-500">{label}</p>
        <p className="mt-1 break-words text-sm text-zinc-300">
          {value}
        </p>
      </div>
    </div>
  );
}

function CompanyRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
      <span className="text-xs uppercase tracking-wide text-zinc-500">
        {label}
      </span>

      <span className="text-right text-sm text-zinc-300">
        {value}
      </span>
    </div>
  );
}

export default JobDetails;
