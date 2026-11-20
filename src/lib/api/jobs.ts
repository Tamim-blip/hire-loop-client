import type { JobFormData } from "@/lib/job";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ApiJob = JobFormData & { _id: string };

export async function getData(): Promise<ApiJob[]> {
  const res = await fetch(`${BASE_URL}/jobs`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to load jobs");
  }

  return res.json();
}


export async function getOneJob(jobId : string) {

  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {cache : "no-store"})

  if (!res.ok) {
    throw new Error("Failed to load single job");
  }
  return res.json()

}
