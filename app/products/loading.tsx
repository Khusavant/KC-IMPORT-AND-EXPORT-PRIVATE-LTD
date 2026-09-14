"use client";

import React from "react";
import { Skeleton } from "@/components/animations/Skeleton";

export default function ProductsLoading() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-10 w-80 rounded-lg" />
          <Skeleton className="h-4 w-96 rounded" />
        </div>

        {/* Filter Bar Skeleton */}
        <Skeleton className="h-14 rounded-xl border border-gray-200" />

        {/* Product Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col"
            >
              <Skeleton className="h-48 w-full" />
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20 rounded" />
                  <Skeleton className="h-5 w-4/5 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                </div>
                <Skeleton className="h-10 rounded-lg mt-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
