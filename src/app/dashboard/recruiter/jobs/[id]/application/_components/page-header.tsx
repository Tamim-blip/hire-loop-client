import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ApiJob } from "@/lib/job";

type ApplicationPageHeaderProps = {
  job: ApiJob;
};

export function ApplicationPageHeader({ job }: ApplicationPageHeaderProps) {
  return (
    <div className="min-w-0">
      <Button
        variant="ghost"
        size="sm"
        render={<Link href="/dashboard/recruiter/jobs" />}
        className="-ml-2 text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to jobs
      </Button>

      <div className="mt-4 flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
        <Link
          href="/dashboard/recruiter/jobs"
          className="shrink-0 hover:text-foreground"
        >
          Manage Jobs
        </Link>

        <ChevronRight className="size-4 shrink-0" />

        <span className="truncate">{job.title}</span>

        <ChevronRight className="size-4 shrink-0" />

        <span className="shrink-0">Applications</span>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Applications
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Review candidates who applied for{" "}
            <span className="font-medium text-foreground">{job.title}</span> at{" "}
            {job.company}.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-normal">
            {job.jobType}
          </Badge>

          <Badge
            variant="outline"
            className={
              job.status === "Active"
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400"
            }
          >
            {job.status}
          </Badge>
        </div>
      </div>
    </div>
  );
}
