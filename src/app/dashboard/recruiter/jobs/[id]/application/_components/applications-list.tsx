import type { ManagedApplication } from "@/lib/application";
import { ApplicationCard } from "./application-card";
import { ApplicationsTable } from "./applications-table";

type ApplicationsListProps = {
  applications: ManagedApplication[];
};

export function ApplicationsList({ applications }: ApplicationsListProps) {
  return (
    <>
      <ApplicationsTable applications={applications} />

      <div className="mt-6 grid min-w-0 grid-cols-1 gap-3 sm:gap-4 lg:hidden">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
          />
        ))}
      </div>
    </>
  );
}
