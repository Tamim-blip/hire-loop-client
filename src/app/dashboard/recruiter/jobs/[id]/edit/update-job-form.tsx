"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  JOB_CATEGORIES,
  JOB_TYPES,
  SALARY_FREQUENCIES,
  type JobFormData,
  type JobType,
  type SalaryFrequency,
} from "@/lib/job";
import { updateJob } from "@/lib/action/jobs";
import { toastError, toastSuccess } from "@/lib/toast";
import { useRouter } from "next/navigation";

const inputClassName = "h-10";
const selectTriggerClassName = "h-10 w-full";

type UpdateJobFormProps = {
  jobId: string;
  job: JobFormData;
};

export function UpdateJobForm({ jobId, job }: UpdateJobFormProps) {
  const [jobType, setJobType] = useState<JobType>(job.jobType);
  const [isRemote, setIsRemote] = useState(job.isRemote);

  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const value = (name: string) => String(formData.get(name) ?? "");

    const updatedJob: JobFormData = {
      title: value("title"),
      company: value("company"),
      category: value("category"),
      jobType,
      isRemote,
      location: value("location"),
      deadline: value("deadline"),
      minSalary: value("minSalary"),
      maxSalary: value("maxSalary"),
      frequency: value("frequency") as SalaryFrequency,
      responsibilities: value("responsibilities"),
      requirements: value("requirements"),
    };


    const result = await updateJob(updatedJob, jobId)


     if (result?.modifiedCount > 0) {
            toastSuccess("Job modified", `${job.title} has been modified succesfully.`)
            
            router.refresh()
            router.push('/dashboard/recruiter/jobs')
            return
          }
    
          toastError(
            "Job not modified",
            "Somethong went wrong. Your jos is not modified"
          )

   
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link
              href="/dashboard/recruiter/jobs"
              className="transition-colors hover:text-foreground"
            >
              Manage Jobs
            </Link>
            <ChevronRight className="size-4" />
            <Link
              href="/dashboard/recruiter/jobs"
              className="transition-colors hover:text-foreground"
            >
              Job Listings &amp; Postings
            </Link>
            <ChevronRight className="size-4" />
            <span>Update Job Post</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Update Job Post
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Modify position specifications, compensation range, and candidate
            requirements for this listing.
          </p>
        </div>
      </div>

      <form
        id="update-job-form"
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-6"
      >
        {/* 1. Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>1. Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <Field>
              <FieldLabel htmlFor="title">
                Job Title <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="title"
                name="title"
                defaultValue={job.title}
                placeholder="Frontend Developer"
                className={inputClassName}
                required
              />
            </Field>

            <FieldGroup className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="company">
                  Company Name <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="company"
                  name="company"
                  defaultValue={job.company}
                  placeholder="HirePulse Network"
                  className={inputClassName}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="category">
                  Job Category <span className="text-destructive">*</span>
                </FieldLabel>
                <Select
                  name="category"
                  defaultValue={job.category}
                  required
                >
                  <SelectTrigger
                    id="category"
                    className={selectTriggerClassName}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>

            <Field>
              <FieldLabel>
                Job Type <span className="text-destructive">*</span>
              </FieldLabel>
              <ToggleGroup
                value={[jobType]}
                onValueChange={(values) => {
                  if (values[0]) setJobType(values[0] as JobType);
                }}
                variant="outline"
                spacing={0}
                className="w-full"
              >
                {JOB_TYPES.map((type) => (
                  <ToggleGroupItem
                    key={type}
                    value={type}
                    className="h-10 flex-1"
                  >
                    {type}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </Field>
          </CardContent>
        </Card>

        {/* 2. Location, Compensation & Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>2. Location, Compensation & Timeline</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <Field
              orientation="horizontal"
              className="items-center justify-between rounded-lg border border-border bg-muted/30 p-4"
            >
              <FieldContent>
                <FieldLabel htmlFor="isRemote">
                  Remote Work Allowed
                </FieldLabel>
                <FieldDescription>
                  Enable worldwide or distributed candidate applications
                </FieldDescription>
              </FieldContent>
              <Switch
                id="isRemote"
                checked={isRemote}
                onCheckedChange={setIsRemote}
              />
            </Field>

            <FieldGroup className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="location">
                  Job Location <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="location"
                  name="location"
                  defaultValue={job.location}
                  placeholder="New York, USA"
                  className={inputClassName}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="deadline">
                  Application Deadline{" "}
                  <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  defaultValue={
                    job.deadline ? job.deadline.slice(0, 10) : ""
                  }
                  className={inputClassName}
                  required
                />
              </Field>
            </FieldGroup>

            <FieldGroup className="grid gap-5 sm:grid-cols-3">
              <Field>
                <FieldLabel htmlFor="minSalary">Min Salary / Rate</FieldLabel>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="minSalary"
                    name="minSalary"
                    type="number"
                    min="0"
                    defaultValue={job.minSalary}
                    placeholder="0"
                    className={`${inputClassName} pl-7`}
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="maxSalary">Max Salary / Rate</FieldLabel>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="maxSalary"
                    name="maxSalary"
                    type="number"
                    min="0"
                    defaultValue={job.maxSalary}
                    placeholder="0"
                    className={`${inputClassName} pl-7`}
                  />
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="frequency">Frequency</FieldLabel>
                <Select
                  name="frequency"
                  defaultValue={job.frequency}
                  required
                >
                  <SelectTrigger
                    id="frequency"
                    className={selectTriggerClassName}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SALARY_FREQUENCIES.map((frequency) => (
                      <SelectItem key={frequency} value={frequency}>
                        {frequency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* 3. Responsibilities & Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>3. Responsibilities & Requirements</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <Field>
              <FieldLabel htmlFor="responsibilities">
                Key Responsibilities{" "}
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Textarea
                id="responsibilities"
                name="responsibilities"
                defaultValue={job.responsibilities}
                placeholder="Describe what the person in this role will be responsible for..."
                className="min-h-32"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="requirements">
                Qualifications & Requirements{" "}
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Textarea
                id="requirements"
                name="requirements"
                defaultValue={job.requirements}
                placeholder="List the skills, experience, and qualifications required for this role..."
                className="min-h-32"
                required
              />
            </Field>
          </CardContent>
        </Card>

        <section>
          <Button
            type="submit"
            form="update-job-form"
            className="h-10 shrink-0 bg-[#5c53fe] px-4 text-white hover:bg-[#6f67ff]"
          >
            Update Job
            <ArrowRight className="size-4" />
          </Button>
        </section>
      </form>
    </div>
  );
}
