import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

const JobDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <Suspense fallback={<Skeleton className="m-8 h-72 rounded-xl" />}>
      <JobDetailsContent params={params} />
    </Suspense>
  );
};

async function JobDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;

  return <div>JobDetails</div>;
}

export default JobDetails;
