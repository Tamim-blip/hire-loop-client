import { Suspense } from "react";
import { notFound } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { getJobApplications } from "@/lib/api/application";
import { getOneJob } from "@/lib/api/jobs";
import { normalizeApplication } from "@/lib/application";
import { getSession } from "@/lib/core/server";
import { ApplicationPageHeader } from "./_components/page-header";
import { ApplicationStats } from "./_components/application-stats";
import { ApplicationsEmptyState } from "./_components/applications-empty-state";
import { ApplicationsList } from "./_components/applications-list";

type JobApplicationPageProps = {
  params: Promise<{ id: string }>;
};

function ApplicationsLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl min-w-0 px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Skeleton className="h-8 w-64 max-w-full" />
      <Skeleton className="mt-3 h-4 w-96 max-w-full" />
      <Skeleton className="mt-8 h-72 w-full rounded-xl" />
    </div>
  );
}

export default function JobApplicationPage({
  params,
}: JobApplicationPageProps) {
  return (
    <Suspense fallback={<ApplicationsLoading />}>
      <JobApplicationContent params={params} />
    </Suspense>
  );
}

async function JobApplicationContent({ params }: JobApplicationPageProps) {
  const { id } = await params;

  const [job, session] = await Promise.all([getOneJob(id), getSession()]);

  // Hide jobs that do not exist or belong to another recruiter.
  if (!job || job.recruiterId !== session?.user?.id) {
    notFound();
  }

  const applications = await getJobApplications(id);
  const managedApplications = applications.map(normalizeApplication);

  return (
    <div className="mx-auto w-full max-w-7xl min-w-0 px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
      <ApplicationPageHeader job={job} />

      {managedApplications.length === 0 ? (
        <ApplicationsEmptyState />
      ) : (
        <>
          <ApplicationStats applications={managedApplications} />

          <ApplicationsList applications={managedApplications} />
        </>
      )}
    </div>
  );
}
