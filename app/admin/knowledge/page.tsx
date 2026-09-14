import React from "react";
import KnowledgeUploader from "@/components/admin/KnowledgeUploader";

export default function AdminKnowledgePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
          AI Knowledge Base & Document Index
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Upload commercial specifications, laboratory guidelines, and export trade agreements for automated AI buyer assistance
        </p>
      </div>

      <KnowledgeUploader />
    </div>
  );
}
