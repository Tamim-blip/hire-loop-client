import Link from "next/link";
import { Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function ApplicationsEmptyState() {
  return (
    <Empty className="mt-6 border border-dashed border-border bg-card py-14">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Users />
        </EmptyMedia>

        <EmptyTitle>No applications yet</EmptyTitle>

        <EmptyDescription>
          Candidates who apply for this job will appear here.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button
          variant="outline"
          render={<Link href="/dashboard/recruiter/jobs" />}
        >
          Back to jobs
        </Button>
      </EmptyContent>
    </Empty>
  );
}
