/**
 * Shared application types and helpers used by recruiter and seeker
 * application views, so both stay in sync with the database shape.
 */

import type { JobType } from "@/lib/job";

export const APPLICATION_STATUSES = [
  "Applied",
  "Review",
  "Shortlisted",
  "Interview",
  "Offered",
  "Rejected",
  "Archived",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

/** A job application document as returned by the API. */
export type JobApplication = {
  _id: string;
  jobId: string;
  userId: string;
  email: string;
  name: string;
  jobTitle: string;
  jobType: JobType;
  deadline: string;
  companiName: string;
  isRemote: boolean;
  /** Not every stored application has a status yet. */
  status?: string;
  appliedAt?: string;
  archived?: boolean;
};

/** An application prepared for UI rendering. */
export type ManagedApplication = Omit<JobApplication, "status"> & {
  id: string;
  status: ApplicationStatus;
};

/**
 * Converts a raw status value into a known status.
 * Missing or unrecognized values fall back to "Applied".
 */
export function normalizeApplicationStatus(
  status?: string | null,
): ApplicationStatus {
  if (!status) return "Applied";

  const normalized = status.trim().toLowerCase();

  const match = APPLICATION_STATUSES.find(
    (applicationStatus) => applicationStatus.toLowerCase() === normalized,
  );

  return match ?? "Applied";
}

/** Maps an API application into the shape used by UI components. */
export function normalizeApplication(
  application: JobApplication,
): ManagedApplication {
  return {
    ...application,
    id: application._id,
    status: normalizeApplicationStatus(application.status),
  };
}
