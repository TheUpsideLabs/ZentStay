"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { CollegeHero } from "./college-hero";
import { CollegeStats } from "./college-stats";
import { CollegeAbout } from "./college-about";
import { CollegeNearby } from "./college-nearby";
import { CollegeEssentials } from "./college-essentials";
import { CollegeGallery } from "./college-gallery";
import { CollegeReviews } from "./college-reviews";
import { CollegeMap } from "./college-map";
import { CollegeRelated } from "./college-related";

import collegeService, { College } from "@/services/college.service";

interface Props {
  slug: string;
}

export function CollegePage({ slug }: Props) {
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    collegeService.getCollegeBySlug(slug)
      .then(setCollege)
      .catch(() => setCollege(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-50 pt-32 pb-20 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        </main>
        <Footer />
      </>
    );
  }

  if (!college) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-slate-50 pt-32 pb-20 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">College Not Found</h1>
          <p className="text-slate-500">The institution you are looking for does not exist or has been removed.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-28">
        <CollegeHero college={college} />
        <CollegeStats college={college} />
        <CollegeAbout college={college} />
        <CollegeNearby college={college} />
        <CollegeEssentials />
        <CollegeGallery slug={slug} />
        <CollegeReviews />
        <CollegeMap slug={slug} />
        <CollegeRelated slug={slug} />
      </main>
      <Footer />
    </>
  );
}