"use server";

import type { ApplicationStatus } from "@/lib/application";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type UpdateApplicationStatusResult = {
  matchedCount: number;
  modifiedCount: number;
};

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
): Promise<UpdateApplicationStatusResult> {
  const res = await fetch(`${BASE_URL}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update application status");
  }

  return res.json();
}
