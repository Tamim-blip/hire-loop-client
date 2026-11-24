import { format, isValid, parseISO } from "date-fns";

/** Formats an optional application timestamp, falling back to "Recently". */
export function formatAppliedAt(appliedAt?: string) {
  if (!appliedAt) return "Recently";

  const date = parseISO(appliedAt);

  return isValid(date) ? format(date, "MMM dd, yyyy") : appliedAt;
}
