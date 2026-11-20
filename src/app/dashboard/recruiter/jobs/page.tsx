import Link from "next/link";
import { Suspense } from "react";
import { format, isPast, isValid, parseISO } from "date-fns";
import {
  Briefcase,
  Building2,
  ChevronRight,
  MapPin,
  Plus,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getData } from "@/lib/api/jobs";
import { type JobFormData, type SalaryFrequency } from "@/lib/job";
import { JobActions } from "./_component/manageJobAction";

type JobStatus = "Active" | "Expired";

export type ManagedJob = JobFormData & {
  id: string;
  applicants: number;
  status: JobStatus;
  postedLabel: string;
};

const FREQUENCY_SUFFIX: Record<SalaryFrequency, string> = {
  "per hour": "hr",
  "per month": "mo",
  "per year": "yr",
};

function formatDeadline(deadline: string) {
  const date = parseISO(deadline);
  return isValid(date) ? format(date, "MMM dd, yyyy") : deadline;
}

function formatSalary(job: ManagedJob) {
  if (!job.minSalary && !job.maxSalary) return "Not specified";

  const min = Number(job.minSalary).toLocaleString();
  const max = Number(job.maxSalary).toLocaleString();

  return `$${min} – $${max} / ${FREQUENCY_SUFFIX[job.frequency]}`;
}

function formatLocation(job: ManagedJob) {
  return job.isRemote ? `Remote (${job.location})` : job.location;
}

function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <Badge
      variant="outline"
      className={
        status === "Active"
          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
          : "border-red-500/20 bg-red-500/10 text-red-400"
      }
    >
      {status}
    </Badge>
  );
}



function JobsLoading() {
  return <Skeleton className="mt-8 h-72 w-full rounded-xl" />;
}

export default function ManageJobs() {
  return (
    <div className="mx-auto w-full max-w-7xl min-w-0 px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Page Header */}
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Manage Jobs</span>
            <ChevronRight className="size-4" />
            <span>Job Listings & Postings</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Manage Job Posts
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Button
          render={<Link href="/dashboard/recruiter/add-job" />}
          className="h-10 w-full shrink-0 bg-[#5c53fe] px-4 text-white hover:bg-[#6f67ff] sm:w-auto"
        >
          <Plus className="size-4" />
          New Job Post
        </Button>
      </div>

      <Suspense fallback={<JobsLoading />}>
        <JobsContent />
      </Suspense>
    </div>
  );
}

async function JobsContent() {
  const apiJobs = await getData();

  const jobs: ManagedJob[] = apiJobs.map((job) => {
    const expired = isPast(parseISO(job.deadline));

    return {
      ...job,
      id: job._id,
      applicants: 0,
      status: expired ? "Expired" : "Active",
      postedLabel: expired ? "Closed" : "Posted recently",
    };
  });

  if (jobs.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-16 text-center">
        <Briefcase className="mb-3 size-8 text-muted-foreground" />

        <h2 className="font-medium">No job posts yet</h2>

        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Create your first listing to start receiving applications.
        </p>

        <Button
          render={<Link href="/dashboard/recruiter/add-job" />}
          className="mt-4 bg-[#5c53fe] text-white hover:bg-[#6f67ff]"
        >
          <Plus className="size-4" />
          New Job Post
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="mt-8 hidden min-w-0 overflow-x-auto rounded-xl border border-border bg-card lg:block">
        <Table className="min-w-[1100px]">
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="pl-4">JOB TITLE & DEPT</TableHead>
              <TableHead>COMPANY & LOCATION</TableHead>
              <TableHead>TYPE</TableHead>
              <TableHead>COMPENSATION</TableHead>
              <TableHead>APPLICANTS</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>DEADLINE</TableHead>
              <TableHead className="pr-4 text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="py-3 pl-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold">{job.title}</span>

                    <span className="text-xs text-muted-foreground">
                      {job.category}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-3">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="size-3.5 text-muted-foreground" />
                      {job.company}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" />
                      {formatLocation(job)}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-3">
                  <Badge variant="outline" className="font-normal">
                    {job.jobType}
                  </Badge>
                </TableCell>

                <TableCell className="py-3 font-medium">
                  {formatSalary(job)}
                </TableCell>

                <TableCell className="py-3">
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    <Users className="size-4 text-muted-foreground" />
                    {job.applicants} Candidates
                  </span>
                </TableCell>

                <TableCell className="py-3">
                  <StatusBadge status={job.status} />
                </TableCell>

                <TableCell className="py-3">
                  <div className="flex flex-col gap-0.5">
                    <span>{formatDeadline(job.deadline)}</span>

                    <span className="text-xs text-muted-foreground">
                      {job.postedLabel}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-3 pr-4">
                  <JobActions job={job} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile & Tablet Cards */}
      <div className="mt-6 grid min-w-0 grid-cols-1 gap-3 sm:mt-8 sm:gap-4 lg:hidden">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="min-w-0 rounded-xl border border-border bg-card p-3 sm:p-4"
          >
            {/* Card Header */}
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="break-words font-semibold">{job.title}</p>

                <p className="break-words text-sm text-muted-foreground">
                  {job.category}
                </p>
              </div>

              <StatusBadge status={job.status} />
            </div>

            {/* Job Information */}
            <div className="mt-4 grid min-w-0 gap-2 text-sm">
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-start gap-3">
                <span className="text-muted-foreground">Company</span>
                <span className="min-w-0 text-right [overflow-wrap:anywhere]">
                  {job.company}
                </span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-start gap-3">
                <span className="text-muted-foreground">Location</span>
                <span className="min-w-0 text-right [overflow-wrap:anywhere]">
                  {formatLocation(job)}
                </span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-start gap-3">
                <span className="text-muted-foreground">Type</span>
                <span className="min-w-0 text-right [overflow-wrap:anywhere]">
                  {job.jobType}
                </span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-start gap-3">
                <span className="text-muted-foreground">Compensation</span>
                <span className="min-w-0 text-right [overflow-wrap:anywhere]">
                  {formatSalary(job)}
                </span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-start gap-3">
                <span className="text-muted-foreground">Applicants</span>
                <span className="min-w-0 text-right [overflow-wrap:anywhere]">
                  {job.applicants}
                </span>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-start gap-3">
                <span className="text-muted-foreground">Deadline</span>
                <span className="min-w-0 text-right [overflow-wrap:anywhere]">
                  {formatDeadline(job.deadline)}
                </span>
              </div>
            </div>

            {/* Card Actions */}
            <div className="mt-4 border-t border-border pt-3 [&>div]:justify-start">
              <JobActions job={job} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
