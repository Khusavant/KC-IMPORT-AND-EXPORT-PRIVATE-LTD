"use client";

import React from "react";
import { Skeleton } from "@/components/animations/Skeleton";

export default function BlogLoading() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Skeleton */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Skeleton className="h-4 w-28 rounded-full mx-auto" />
          <Skeleton className="h-10 w-96 rounded-xl mx-auto" />
          <Skeleton className="h-4 w-80 rounded mx-auto" />
        </div>

        {/* Featured Card Skeleton */}
        <Skeleton className="h-80 rounded-3xl border border-gray-200 overflow-hidden shadow-sm" />

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col"
            >
              <Skeleton className="h-48 w-full" />
              <div className="p-6 space-y-3">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-6 w-5/6 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
