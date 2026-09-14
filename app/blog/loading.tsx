import React from "react";

export default function BlogLoading() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10 animate-pulse">
        {/* Header Skeleton */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="h-4 w-28 bg-gray-200 rounded-full mx-auto"></div>
          <div className="h-10 w-96 bg-gray-300 rounded-xl mx-auto"></div>
          <div className="h-4 w-80 bg-gray-200 rounded mx-auto"></div>
        </div>

        {/* Featured Card Skeleton */}
        <div className="h-80 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm"></div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-5/6 bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-100 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
