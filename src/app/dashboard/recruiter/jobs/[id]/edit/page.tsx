import { Suspense } from "react";
import { notFound } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { getOneJob } from "@/lib/api/jobs";
import { UpdateJobForm } from "./update-job-form";

type UpdateJobPageProps = {
  params: Promise<{ id: string }>;
};

function UpdateJobLoading() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="h-[900px] w-full rounded-xl" />
    </div>
  );
}

export default function UpdateJobPage({ params }: UpdateJobPageProps) {
  return (
    <Suspense fallback={<UpdateJobLoading />}>
      <UpdateJobContent params={params} />
    </Suspense>
  );
}

async function UpdateJobContent({ params }: UpdateJobPageProps) {
  const { id } = await params;

  const job = await getOneJob(id);

  if (!job) {
    notFound();
  }

  return <UpdateJobForm jobId={job._id} job={job} />;
}
