/**
 * Shared job types used by the "Post a New Job" form and the
 * "Manage Job Posts" page, so both stay in sync with the database shape.
 */

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const;

export type JobType = (typeof JOB_TYPES)[number];

export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Sales",
  "Customer Support",
  "Finance",
  "Operations",
  "Other",
];

export const SALARY_FREQUENCIES = [
  "per hour",
  "per month",
  "per year",
] as const;

export type SalaryFrequency = (typeof SALARY_FREQUENCIES)[number];

export type JobStatus = "Active" | "Expired";

/** The exact payload collected by the job post form. */
export type JobFormData = {
  
  title: string;
  company: string;
  category: string;
  jobType: JobType;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: SalaryFrequency;
  responsibilities: string;
  requirements: string;
  applicants: number;
  status: JobStatus;
  postedLabel: string;

};


/** A job document as returned by the API. */
export type ApiJob = JobFormData & {
  _id: string;
};

/** A job prepared for the Manage Jobs page. */
export type ManagedJob = JobFormData & {
  id: string;
};

/** Values used by the Browse Jobs search and filter form. */
export type BrowseJobsFilters = {
  search: string;
  jobType: JobType | "";
  category: string;
  location: string;
  isRemote: boolean;
};
