import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { getJobs } from "@/lib/api/jobs";
import { JOB_TYPES, type BrowseJobsFilters } from "@/lib/job";

import { BrowseJobsControls } from "./_components/browse-jobs-controls";
import { JobCard } from "./_components/job-card";

type BrowseJobsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function readFilters(
  params: Record<string, string | string[] | undefined>
): BrowseJobsFilters {
  const jobType = firstValue(params.jobType);

  return {
    search: firstValue(params.search),
    jobType: JOB_TYPES.find((type) => type === jobType) ?? "",
    category: firstValue(params.category),
    location: firstValue(params.location),
    isRemote: firstValue(params.isRemote) === "true",
  };
}



function BrowseJobsLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[60px] w-full rounded-xl" />
      <div className="grid gap-6 lg:grid-cols-[296px_minmax(0,1fr)]">
        <Skeleton className="h-[420px] rounded-xl" />
        <Skeleton className="h-[420px] rounded-xl" />
      </div>
    </div>
  );
}

const BrowseJobs = ({ searchParams }: BrowseJobsPageProps) => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Browse Jobs
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Search and filter opportunities that match your next role.
        </p>
      </header>

      <Suspense fallback={<BrowseJobsLoading />}>
        <BrowseJobsContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

async function BrowseJobsContent({ searchParams }: BrowseJobsPageProps) {
  const params = await searchParams;
  const urlSearch= new URLSearchParams(params as Record<string, string>)
  const query = urlSearch.toString()

  const browseJobs = await getJobs(query);

  return (
    <BrowseJobsControls key={query} filters={readFilters(params)}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">
          Found {browseJobs.length} {browseJobs.length === 1 ? "Job" : "Jobs"}
        </h2>
      </div>

      {browseJobs.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border px-4 py-12 text-center text-sm text-muted-foreground">
          No jobs match your search. Try adjusting the filters.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {browseJobs.map((job) => (
            <li key={job._id}>
              <JobCard job={job} href={`/browse-jobs/${job._id}`} />
            </li>
          ))}
        </ul>
      )}
    </BrowseJobsControls>
  );
}

export default BrowseJobs;
