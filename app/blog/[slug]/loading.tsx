"use client";

import React from "react";
import { Skeleton } from "@/components/animations/Skeleton";

export default function BlogPostLoading() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Skeleton className="h-4 w-32 rounded" />
        <Skeleton className="h-12 w-4/5 rounded-xl" />
        <Skeleton className="h-4 w-60 rounded" />
        <Skeleton className="h-96 rounded-3xl" />
        <div className="space-y-4 pt-4">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-4/5 rounded" />
        </div>
      </div>
    </div>
  );
}
