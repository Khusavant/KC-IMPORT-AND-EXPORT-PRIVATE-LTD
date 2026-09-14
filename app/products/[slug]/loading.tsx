"use client";

import React from "react";
import { Skeleton } from "@/components/animations/Skeleton";

export default function ProductDetailLoading() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb Skeleton */}
        <Skeleton className="h-4 w-48 rounded" />

        {/* 2-Column Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Gallery Skeleton */}
          <div className="lg:col-span-6 space-y-4">
            <Skeleton className="h-96 rounded-2xl w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-20 w-20 rounded-xl" />
              <Skeleton className="h-20 w-20 rounded-xl" />
              <Skeleton className="h-20 w-20 rounded-xl" />
            </div>
          </div>

          {/* Details Skeleton */}
          <div className="lg:col-span-6 space-y-6">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-10 w-4/5 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
            </div>

            {/* Spec Table Skeleton */}
            <div className="h-48 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <Skeleton className="h-4 w-1/3 rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>

            {/* CTA Buttons Skeleton */}
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-12 w-44 rounded-xl" />
              <Skeleton className="h-12 w-44 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
