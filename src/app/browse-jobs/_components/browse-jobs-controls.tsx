"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import type { FormEvent, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  JOB_CATEGORIES,
  JOB_TYPES,
  type BrowseJobsFilters,
} from "@/lib/job";
import { useRouter } from "next/navigation";


type BrowseJobsControlsProps = {
  filters: BrowseJobsFilters;
  children: ReactNode;
};

export function BrowseJobsControls({
  filters,
  children,
}: BrowseJobsControlsProps) {


  const router = useRouter()


  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchValue = Object.fromEntries(formData.entries())

    const search = searchValue.searchFeild

    const params = new URLSearchParams()
       params.set("search", search as string)
       router.push(`/browse-jobs?${params.toString()}`)

    

    // TODO: apply the search using the collected form data.
   
  }

  function handleFilter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

   const filteredValue = Object.fromEntries(formData.entries())

   const category = filteredValue.category
   const jobType = filteredValue.jobType

   const params = new URLSearchParams()
   params.set("jobType", jobType as string)
   params.set("category", category as string)
   router.push(`/browse-jobs?${params.toString()}`)

   console.log(category, jobType)
  }

  return (
    <>
      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-2 rounded-xl border border-border bg-card p-2 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="searchFeild"
            defaultValue={filters.search}
            placeholder="Search by job title, keywords..."
            aria-label="Search jobs"
            className="h-11 border-0 bg-transparent pl-9 focus-visible:ring-0 dark:bg-transparent"
          />
        </div>

        <Button
          type="submit"
          className="h-11 shrink-0 bg-[#5c53fe] px-6 text-white hover:bg-[#6f67ff]"
        >
          Search Jobs
        </Button>
      </form>

      <div className="mt-6 grid gap-6 lg:grid-cols-[296px_minmax(0,1fr)]">
        {/* Sidebar filters */}
        <form
          onSubmit={handleFilter}
          className="flex h-fit flex-col gap-4"
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-muted-foreground" />
            <h2 className="font-semibold">Filters</h2>
          </div>

          <div className="min-w-0 rounded-xl border border-border bg-card p-5">
            <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Job Type
            </h3>

            <RadioGroup
              aria-label="Job type"
              name="jobType"
              defaultValue={filters.jobType || undefined}
              className="mt-3 gap-3"
            >
              {JOB_TYPES.map((type) => (
                <div key={type} className="flex items-center gap-3">
                  <RadioGroupItem id={`job-type-${type}`} value={type} />
                  <Label
                    htmlFor={`job-type-${type}`}
                    className="cursor-pointer font-normal"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="min-w-0 rounded-xl border border-border bg-card p-5">
            <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Category
            </h3>

            <RadioGroup
              aria-label="Category"
              name="category"
              defaultValue={filters.category || undefined}
              className="mt-3 gap-3"
            >
              {JOB_CATEGORIES.map((category) => (
                <div key={category} className="flex items-center gap-3">
                  <RadioGroupItem
                    id={`category-${category}`}
                    value={category}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="cursor-pointer font-normal"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>


         

          <Button
            type="submit"
            className="h-10 w-full bg-[#5c53fe] text-white hover:bg-[#6f67ff]"
          >
            Apply Filters
          </Button>
        </form>

        {/* Results */}
        <section className="min-w-0">{children}</section>
      </div>
    </>
  );
}
