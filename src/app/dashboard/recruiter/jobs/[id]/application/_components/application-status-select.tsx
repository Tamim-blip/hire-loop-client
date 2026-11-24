"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateApplicationStatus } from "@/lib/action/application";
import {
  APPLICATION_STATUSES,
  type ApplicationStatus,
} from "@/lib/application";
import { toastError, toastSuccess } from "@/lib/toast";
import { cn } from "@/lib/utils";

type ApplicationStatusSelectProps = {
  applicationId: string;
  value: ApplicationStatus;
  className?: string;
  disabled?: boolean;
};

export function ApplicationStatusSelect({
  applicationId,
  value,
  className,
  disabled,
}: ApplicationStatusSelectProps) {
  const router = useRouter();
  const [status, setStatus] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  async function handleStatusChange(nextStatus: ApplicationStatus | null) {
    if (!nextStatus || nextStatus === status) return;

    const previousStatus = status;

    setStatus(nextStatus);
    setIsSaving(true);

    try {
      const result = await updateApplicationStatus(applicationId, nextStatus);

      if (!result.matchedCount) {
        throw new Error("Application not found");
      }

      toastSuccess("Status updated", `Applicant marked as ${nextStatus}.`);
      router.refresh();
    } catch (error) {
      setStatus(previousStatus);

      toastError(
        "Failed to update status",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Select<ApplicationStatus>
      value={status}
      onValueChange={handleStatusChange}
      disabled={disabled || isSaving}
    >
      <SelectTrigger
        size="sm"
        aria-label="Update applicant status"
        aria-busy={isSaving}
        className={cn("w-[150px]", className)}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {APPLICATION_STATUSES.map((applicationStatus) => (
          <SelectItem key={applicationStatus} value={applicationStatus}>
            {applicationStatus}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
