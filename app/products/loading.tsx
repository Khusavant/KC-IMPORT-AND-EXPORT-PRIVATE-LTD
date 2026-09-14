import React from "react";

export default function ProductsLoading() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-10 w-80 bg-gray-300 rounded-lg"></div>
          <div className="h-4 w-96 bg-gray-200 rounded"></div>
        </div>

        {/* Filter Bar Skeleton */}
        <div className="h-14 bg-white rounded-xl border border-gray-200"></div>

        {/* Product Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  <div className="h-5 w-4/5 bg-gray-300 rounded"></div>
                  <div className="h-4 w-full bg-gray-100 rounded"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded-lg mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
