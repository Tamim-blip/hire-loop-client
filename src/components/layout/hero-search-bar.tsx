"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MapPinIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSearchBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  return (
    <form
      className="mx-auto flex w-full max-w-[784px] flex-col gap-2 rounded-2xl border border-white/10 bg-[#101010] p-2 md:flex-row md:items-center md:gap-6 md:py-2 md:pr-2 md:pl-6"
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (keyword.trim()) params.set("q", keyword.trim());
        if (location.trim()) params.set("location", location.trim());
        router.push(`/jobs?${params.toString()}`);
      }}
    >
      <div className="flex h-12 flex-1 items-center gap-3">
        <SearchIcon className="size-5 shrink-0 text-white/60" />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Job title, skill or company"
          aria-label="Job title, skill or company"
          className="h-full w-full bg-transparent text-base text-white outline-none placeholder:text-white/60"
        />
      </div>

      <div className="flex h-12 flex-1 items-center gap-3 border-t border-white/10 pt-2 md:border-t-0 md:border-l md:pt-0 md:pl-6">
        <MapPinIcon className="size-5 shrink-0 text-white/60" aria-hidden="true" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location or Remote"
          aria-label="Location or Remote"
          className="h-full w-full bg-transparent text-base text-white outline-none placeholder:text-white/60"
        />
      </div>

      <Button
        type="submit"
        aria-label="Search jobs"
        className="size-12 shrink-0 self-end rounded-xl bg-[#5c53fe] text-white hover:bg-[#6f67ff] md:self-auto"
      >
        <SearchIcon className="size-5" />
      </Button>
    </form>
  );
}
