import type { ApiJob } from "@/lib/job";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getJobs(query = ''): Promise<ApiJob[]> {
  const res = await fetch(`${BASE_URL}/jobs?${query}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to load jobs");
  }

  return res.json();
}


export async function getRecruiterJob(query = ''): Promise<ApiJob[]> {
  const res = await fetch(`${BASE_URL}/recuritor-jobs?${query}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to load jobs");
  }

  return res.json();
}


export async function getRecruiterJobCount(query = ''){
  const res = await fetch(`${BASE_URL}/recuritor-jobs/count?${query}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to load jobs");
  }

  return res.json();
}





export async function getOneJob(jobId: string): Promise<ApiJob> {

  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {cache : "no-store"})

  if (!res.ok) {
    throw new Error("Failed to load single job");
  }
  return res.json()

}
