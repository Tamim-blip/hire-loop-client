import { Badge } from "@/components/ui/badge";
import type { ManagedApplication } from "@/lib/application";
import { ApplicantAvatar } from "./applicant-avatar";
import { formatAppliedAt } from "./application-date";
import { ApplicationStatusSelect } from "./application-status-select";

type ApplicationCardProps = {
  application: ManagedApplication;
};

export function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <article className="min-w-0 rounded-xl border border-border bg-card p-4">
      <div className="flex min-w-0 items-start gap-3">
        <ApplicantAvatar name={application.name} />

        <div className="min-w-0 flex-1">
          <p className="break-words font-semibold">{application.name}</p>

          <p className="break-words text-sm text-muted-foreground">
            {application.email}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3 text-sm">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Job type</p>

          <Badge variant="outline" className="mt-1 font-normal">
            {application.jobType}
          </Badge>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Applied</p>

          <p className="mt-1">{formatAppliedAt(application.appliedAt)}</p>
        </div>
      </div>

      <div className="mt-3 border-t border-border pt-3">
        <p className="text-xs text-muted-foreground">Status</p>

        <ApplicationStatusSelect
          key={application.status}
          applicationId={application.id}
          value={application.status}
          className="mt-2"
        />
      </div>
    </article>
  );
}
