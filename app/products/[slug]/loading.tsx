import React from "react";

export default function ProductDetailLoading() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 bg-gray-200 rounded"></div>

        {/* 2-Column Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Gallery Skeleton */}
          <div className="lg:col-span-6 space-y-4">
            <div className="h-96 bg-gray-300 rounded-2xl"></div>
            <div className="flex gap-4">
              <div className="h-20 w-20 bg-gray-200 rounded-xl"></div>
              <div className="h-20 w-20 bg-gray-200 rounded-xl"></div>
              <div className="h-20 w-20 bg-gray-200 rounded-xl"></div>
            </div>
          </div>

          {/* Details Skeleton */}
          <div className="lg:col-span-6 space-y-6">
            <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
            <div className="h-10 w-4/5 bg-gray-300 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>

            {/* Spec Table Skeleton */}
            <div className="h-48 bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
            </div>

            {/* CTA Buttons Skeleton */}
            <div className="flex gap-4 pt-4">
              <div className="h-12 w-44 bg-gray-300 rounded-xl"></div>
              <div className="h-12 w-44 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
