
"use client";

import { useMemo, useState } from "react";

import {
  Bell,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Code2,
  Download,
  Mail,
  Search,
  UserRound,
} from "lucide-react";

type Application = {
  _id: string;
  jobId: string;
  userId: string;
  email: string;
  name: string;
  jobTitle: string;
  jobType: string;
  deadline: string;
  companiName: string;
  company?: string;
  appliedAt?: string;
  status?: string;
  archived?: boolean;
};

type Tab = "active" | "archived";

export default function ApplicationsDashboard({
  applications,
}: {
  applications: Application[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>("active");
  const [search, setSearch] = useState("");

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const isArchived =
        application.archived === true ||
        application.status?.toLowerCase() === "archived";

      const matchesTab =
        activeTab === "archived" ? isArchived : !isArchived;

      const company =
        application.companiName || application.company || "";

      const matchesSearch =
        application.jobTitle
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        company.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [applications, activeTab, search]);

  const activeApplications = applications.filter(
    (application) =>
      application.archived !== true &&
      application.status?.toLowerCase() !== "archived",
  );

  const archivedApplications = applications.filter(
    (application) =>
      application.archived === true ||
      application.status?.toLowerCase() === "archived",
  );

  const shortlisted = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "shortlisted",
  ).length;

  const interviews = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "interview",
  ).length;

  const offered = applications.filter(
    (application) =>
      application.status?.toLowerCase() === "offered",
  ).length;

  const successRate =
    applications.length > 0
      ? Math.round((offered / applications.length) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-[#0d0d0f] text-white">
      {/* Top Navigation */}
      <header className="flex min-h-16 flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] px-4 py-3 sm:px-6 lg:px-7">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search applications..."
            className="h-10 w-full rounded-lg border border-white/[0.1] bg-[#101012] pl-10 pr-4 text-sm outline-none placeholder:text-zinc-500 focus:border-white/20"
          />
        </div>

        <div className="ml-auto flex items-center gap-4 sm:gap-5">
          <Bell className="size-5 text-zinc-300" />
          <Mail className="size-5 text-zinc-300" />

          <div className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-[#27272a]">
            <UserRound className="size-5 text-zinc-300" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 sm:py-7 lg:px-7">
        {/* Heading and Tabs */}
        <section className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              My Applications
            </h1>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Track your job applications and interview progress in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-lg border border-white/[0.08] bg-[#19191d] p-1">
              <button
                type="button"
                onClick={() => setActiveTab("active")}
                className={`rounded-md px-4 py-2 text-sm transition ${
                  activeTab === "active"
                    ? "border border-white/[0.08] bg-[#202024] text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Active
                <span className="ml-2 text-xs">
                  {activeApplications.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("archived")}
                className={`rounded-md px-4 py-2 text-sm transition ${
                  activeTab === "archived"
                    ? "border border-white/[0.08] bg-[#202024] text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Archived
                <span className="ml-2 text-xs">
                  {archivedApplications.length}
                </span>
              </button>
            </div>

            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              <Download className="size-4" />
              Export PDF
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          <StatCard label="Total Applied" value={applications.length} />

          <StatCard label="Shortlisted" value={shortlisted} />

          <StatCard
            label="Interviews"
            value={interviews}
            valueClassName="text-amber-400"
          />

          <StatCard
            label="Success Rate"
            value={`${successRate}%`}
            valueClassName="text-emerald-500"
          />
        </section>

        {/* Desktop Table */}
        <section className="mt-6 hidden overflow-hidden rounded-xl border border-white/[0.09] bg-[#151518] md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#1b1b1f] text-xs text-zinc-500">
                  <th className="px-6 py-4 font-medium">Job Title</th>
                  <th className="px-5 py-4 font-medium">Company</th>
                  <th className="px-5 py-4 font-medium">Applied</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 text-right font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((application) => (
                  <tr
                    key={application._id}
                    className="border-b border-white/[0.07] transition hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4">
                      <JobTitle application={application} />
                    </td>

                    <td className="px-5 py-4 text-sm text-zinc-300">
                      {application.companiName || application.company}
                    </td>

                    <td className="px-5 py-4 text-sm text-zinc-400">
                      {application.appliedAt || "Recently"}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={application.status || "Applied"} />
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        className="text-sm text-zinc-300 hover:text-white"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApplications.length === 0 && (
            <EmptyState tab={activeTab} />
          )}

          <Pagination count={filteredApplications.length} />
        </section>

        {/* Mobile Application Cards */}
        <section className="mt-6 space-y-3 md:hidden">
          {filteredApplications.map((application) => (
            <article
              key={application._id}
              className="rounded-xl border border-white/[0.09] bg-[#151518] p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#29292e]">
                  <Code2 className="size-5 text-zinc-300" />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="break-words text-sm font-medium text-zinc-200">
                    {application.jobTitle}
                  </h2>

                  <p className="mt-1 break-words text-xs text-zinc-500">
                    {application.companiName || application.company}
                  </p>
                </div>

                <StatusBadge status={application.status || "Applied"} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-3">
                <div>
                  <p className="text-xs text-zinc-500">Job Type</p>
                  <p className="mt-1 text-sm text-zinc-300">
                    {application.jobType}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-zinc-500">Applied</p>
                  <p className="mt-1 text-sm text-zinc-300">
                    {application.appliedAt || "Recently"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-lg border border-white/[0.08] bg-[#202024] py-2.5 text-sm text-zinc-300 transition hover:bg-white/[0.06]"
              >
                Details
              </button>
            </article>
          ))}

          {filteredApplications.length === 0 && (
            <EmptyState tab={activeTab} />
          )}

          <div className="rounded-xl border border-white/[0.08] bg-[#151518] px-4 py-3">
            <p className="text-center text-xs text-zinc-500">
              Showing {filteredApplications.length} of {applications.length} applications
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function JobTitle({ application }: { application: Application }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#29292e]">
        <Code2 className="size-4 text-zinc-200" />
      </div>

      <div>
        <p className="text-sm font-medium text-zinc-200">
          {application.jobTitle}
        </p>

        <p className="mt-1 text-xs text-zinc-500">
          {application.jobType} • Job Application
        </p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  valueClassName = "text-zinc-100",
}: {
  label: string;
  value: string | number;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.09] bg-[#151518] px-4 py-4 sm:px-6">
      <p className="text-xs text-zinc-400 sm:text-sm">{label}</p>

      <p className={`mt-2 text-2xl font-semibold sm:text-3xl ${valueClassName}`}>
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Applied: "border-white/[0.12] bg-[#29292d] text-zinc-400",
    Review: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    Shortlisted: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    Rejected: "border-red-500/30 bg-red-500/10 text-red-400",
    Offered: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    Archived: "border-white/[0.12] bg-[#29292d] text-zinc-400",
  };

  const normalizedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs ${
        styles[normalizedStatus] ||
        "border-white/[0.12] bg-[#29292d] text-zinc-400"
      }`}
    >
      {normalizedStatus}
    </span>
  );
}

function EmptyState({ tab }: { tab: Tab }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl border border-white/[0.08] bg-[#202024]">
        <BriefcaseBusiness className="size-5 text-zinc-500" />
      </div>

      <h3 className="mt-4 text-sm font-medium text-zinc-200">
        {tab === "archived"
          ? "No archived applications"
          : "No applications found"}
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        {tab === "archived"
          ? "Archived applications will appear here."
          : "Try searching with a different job title or company."}
      </p>
    </div>
  );
}

function Pagination({ count }: { count: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] bg-[#1b1b1f] px-6 py-4">
      <p className="text-sm text-zinc-500">
        Showing {count > 0 ? 1 : 0}-{count} applications
      </p>

      <div className="flex items-center gap-2">
        <PageButton>
          <ChevronLeft className="size-4" />
        </PageButton>

        <PageButton active>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>

        <PageButton>
          <ChevronRight className="size-4" />
        </PageButton>
      </div>
    </div>
  );
}

function PageButton({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex size-9 items-center justify-center rounded-lg border text-sm transition ${
        active
          ? "border-white bg-white text-black"
          : "border-white/[0.08] text-zinc-500 hover:bg-white/[0.05]"
      }`}
    >
      {children}
    </button>
  );
}
