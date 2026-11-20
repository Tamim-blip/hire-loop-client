"use client"

import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { ManagedJob } from "../page";

import { Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link";
import { deleteJob } from "@/lib/action/jobs";
import { toastError, toastSuccess } from "@/lib/toast";
import { useState } from "react";
import { useRouter } from "next/navigation";


 
 export function JobActions({ job }: { job: ManagedJob }) {

  const router = useRouter()
   const [open, setOpen] = useState(false)
   const [isDeleting, setIsDeleting] = useState(false)

  const HandleDelete = async () => {
    try {
      setIsDeleting(true)

      const res = await deleteJob(job.id)

      if (res?.deletedCount > 0) {
        toastSuccess("Job deleted", `${job.title} has been removed from your listings.`)
        setOpen(false)
        router.refresh()
        return
      }

      toastError(
        "Job not deleted",
        "This job could not be found or was already removed."
      )
    } catch (error) {
      toastError(
        "Failed to delete job",
        error instanceof Error && error.message
          ? error.message
          : "Please try again in a moment."
      )
    } finally {
      setIsDeleting(false)
    }
  }
  return (
    <div className="flex flex-wrap items-center justify-end gap-1">
      <Button
        variant="outline"
        size="sm"
        render={
          <Link href={`/dashboard/recruiter/jobs/${job.id}/edit`} />
        }
      >
        <Pencil className="size-3.5" />
        Update
      </Button>

      <Button
        variant="ghost"
        size="icon-sm"
        type="button"
        title="View applicants"
        aria-label={`View applicants for ${job.title}`}
      >
        <Eye />
      </Button>


       <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={<Button
        variant="ghost"
        size="icon-sm"
        type="button"
        title="Delete job"
        aria-label={`Delete ${job.title}`}
        className="text-destructive hover:text-destructive"
      >
        <Trash2 />
      </Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete job?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this job. View{" "}
            <Link href="#">Settings</Link> delete any memories saved during this chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={HandleDelete} disabled={isDeleting} variant="destructive">
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

      
    </div>
  );
}