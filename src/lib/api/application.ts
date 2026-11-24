import type { JobApplication } from "@/lib/application";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getApplications(
  query = "",
): Promise<JobApplication[]> {
  const res = await fetch(`${BASE_URL}/applications?${query}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load applications");
  }

  return res.json();
}

export async function getApplicationsCount(
  query = "",
): Promise<{ count: number }> {
  const res = await fetch(`${BASE_URL}/applications/count?${query}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to count applications");
  }

  return res.json();
}

/** Fetches every application submitted for a single job. */
export async function getJobApplications(
  jobId: string,
): Promise<JobApplication[]> {
  return getApplications(`jobId=${encodeURIComponent(jobId)}`);
}
