import { APPLICATION_STATUSES, type ManagedApplication } from "@/lib/application";
import { cn } from "@/lib/utils";

const VALUE_STYLES: Partial<Record<string, string>> = {
  Review: "text-amber-600 dark:text-amber-400",
  Shortlisted: "text-blue-600 dark:text-blue-400",
  Interview: "text-violet-600 dark:text-violet-400",
  Offered: "text-emerald-600 dark:text-emerald-400",
  Rejected: "text-red-600 dark:text-red-400",
};

const VISIBLE_STATUSES = APPLICATION_STATUSES.filter(
  (status) => status !== "Archived",
);

export function ApplicationStats({
  applications,
}: {
  applications: ManagedApplication[];
}) {
  const countByStatus = applications.reduce<Record<string, number>>(
    (counts, application) => {
      counts[application.status] = (counts[application.status] ?? 0) + 1;
      return counts;
    },
    {},
  );

  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
      <StatCard label="Total" value={applications.length} />

      {VISIBLE_STATUSES.map((status) => (
        <StatCard
          key={status}
          label={status}
          value={countByStatus[status] ?? 0}
          valueClassName={VALUE_STYLES[status]}
        />
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: number;
  valueClassName?: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-card px-4 py-3">
      <p className="truncate text-xs text-muted-foreground">{label}</p>

      <p
        className={cn(
          "mt-1 text-xl font-semibold tabular-nums",
          valueClassName,
        )}
      >
        {value}
      </p>
    </div>
  );
}
