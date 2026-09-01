"use client";

import { useSearchParams } from "next/navigation";

import { colleges } from "@/data/colleges";

export function useCollege() {
  const params = useSearchParams();

  const slug = params.get("college");

  const college =
    colleges.find((c) => c.slug === slug) ?? null;

  return {
    college,
  };
}