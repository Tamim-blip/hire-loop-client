import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ManagedApplication } from "@/lib/application";
import { ApplicantAvatar } from "./applicant-avatar";
import { formatAppliedAt } from "./application-date";
import { ApplicationStatusSelect } from "./application-status-select";

type ApplicationsTableProps = {
  applications: ManagedApplication[];
};

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  return (
    <div className="mt-6 hidden min-w-0 overflow-x-auto rounded-xl border border-border bg-card lg:block">
      <Table className="min-w-[720px]">
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="pl-4">APPLICANT</TableHead>
            <TableHead>JOB TYPE</TableHead>
            <TableHead>APPLIED</TableHead>
            <TableHead className="pr-4">STATUS</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="py-3 pl-4">
                <div className="flex items-center gap-3">
                  <ApplicantAvatar name={application.name} />

                  <div className="min-w-0">
                    <p className="truncate font-medium">{application.name}</p>

                    <p className="truncate text-xs text-muted-foreground">
                      {application.email}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="py-3">
                <Badge variant="outline" className="font-normal">
                  {application.jobType}
                </Badge>
              </TableCell>

              <TableCell className="py-3 text-muted-foreground">
                {formatAppliedAt(application.appliedAt)}
              </TableCell>

              <TableCell className="py-3 pr-4">
                <ApplicationStatusSelect
                  key={application.status}
                  applicationId={application.id}
                  value={application.status}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
