import React from "react";

export default function BlogPostLoading() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="h-12 w-4/5 bg-gray-300 rounded-xl"></div>
        <div className="h-4 w-60 bg-gray-200 rounded"></div>
        <div className="h-96 bg-gray-200 rounded-3xl"></div>
        <div className="space-y-4 pt-4">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
