"use client";

import React, { useState } from "react";
import { KnowledgeDoc } from "@/lib/admin-types";
import { KC_KNOWLEDGE_BASE } from "@/lib/knowledge-base";
import {
  UploadCloud,
  FileText,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileSpreadsheet,
  BrainCircuit,
  Info,
  Sparkles,
} from "lucide-react";

const INITIAL_DOCS: KnowledgeDoc[] = [
  {
    id: "DOC-001",
    name: "KC_Product_Catalog_Specifications_2026.pdf",
    type: "PDF",
    uploadDate: "2026-09-12",
    size: "4.8 MB",
    status: "Ready",
    tokensIndexed: 14250,
    category: "Product Specs",
  },
  {
    id: "DOC-002",
    name: "Gujarat_Incoterms_FOB_Mundra_Pricing_Matrix.xlsx",
    type: "EXCEL",
    uploadDate: "2026-09-10",
    size: "1.2 MB",
    status: "Ready",
    tokensIndexed: 8320,
    category: "Commercial Pricing",
  },
  {
    id: "DOC-003",
    name: "Brass_Components_Machining_Tolerances_RoHS.pdf",
    type: "PDF",
    uploadDate: "2026-09-08",
    size: "3.1 MB",
    status: "Ready",
    tokensIndexed: 11400,
    category: "Technical Standards",
  },
  {
    id: "DOC-004",
    name: "Phytosanitary_Spice_Export_Guidelines_EU_USFDA.docx",
    type: "DOCX",
    uploadDate: "2026-09-06",
    size: "850 KB",
    status: "Ready",
    tokensIndexed: 6200,
    category: "Regulatory",
  },
  {
    id: "DOC-005",
    name: "Ceramics_Morbi_Port_Loading_Packaging_Manual.pdf",
    type: "PDF",
    uploadDate: "2026-09-02",
    size: "5.4 MB",
    status: "Ready",
    tokensIndexed: 15600,
    category: "Logistics",
  },
];

export default function KnowledgeUploader() {
  const [docs, setDocs] = useState<KnowledgeDoc[]>(INITIAL_DOCS);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [qaQuestion, setQaQuestion] = useState("");
  const [selectedChunkId, setSelectedChunkId] = useState(KC_KNOWLEDGE_BASE[0]?.id || "");
  const [qaAnswer, setQaAnswer] = useState<string | null>(null);
  const [qaConfidence, setQaConfidence] = useState<"high" | "medium" | "low" | null>(null);
  const [isAskingQA, setIsAskingQA] = useState(false);

  const filteredChunks =
    selectedType === "all"
      ? KC_KNOWLEDGE_BASE
      : KC_KNOWLEDGE_BASE.filter((c) => c.type === selectedType);

  const handleTestQA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaQuestion.trim()) return;
    setIsAskingQA(true);
    setQaAnswer(null);
    try {
      const targetChunk =
        KC_KNOWLEDGE_BASE.find((c) => c.id === selectedChunkId) ||
        filteredChunks[0] ||
        KC_KNOWLEDGE_BASE[0];
      const res = await fetch("/api/doc-qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: qaQuestion,
          documentContent: `${targetChunk.title}\n${targetChunk.content}`,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setQaAnswer(data.answer);
        setQaConfidence(data.confidence);
      }
    } catch (err) {
      console.error("QA test failed:", err);
    } finally {
      setIsAskingQA(false);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    simulateUpload("New_Export_Compliance_Dossier.pdf", "PDF", "2.1 MB");
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateUpload(
        file.name,
        file.name.endsWith(".xlsx") ? "EXCEL" : file.name.endsWith(".docx") ? "DOCX" : "PDF",
        `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      );
    }
  };

  const simulateUpload = (name: string, type: KnowledgeDoc["type"], size: string) => {
    const newDoc: KnowledgeDoc = {
      id: `DOC-00${docs.length + 1}`,
      name,
      type,
      uploadDate: "Just now",
      size,
      status: "Ready",
      tokensIndexed: 4500,
      category: "Export Compliance",
    };
    setDocs([newDoc, ...docs]);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const handleDelete = (id: string) => {
    setDocs(docs.filter((d) => d.id !== id));
  };

  const statusIcons = {
    Ready: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
    Processing: <Clock className="w-3.5 h-3.5 text-amber-500 animate-spin" />,
    Error: <AlertTriangle className="w-3.5 h-3.5 text-red-500" />,
  };

  return (
    <div className="space-y-8">
      {/* Information Banner */}
      <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-5 sm:p-6 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-[#1B3A6B] text-white flex items-center justify-center flex-shrink-0">
          <BrainCircuit className="w-5 h-5 text-[#F5A623]" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-[#1B3A6B] font-serif">
            AI Trade Agent Knowledge Repository
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            Documents uploaded here are automatically vectorized and indexed by the KC AI
            Trade Assistant to answer international buyer inquiries, extract HS code
            specifications, and calculate container load estimates in real time.
          </p>
        </div>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileDrop}
        className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all ${
          isDragging
            ? "border-[#F5A623] bg-amber-50/50"
            : "border-gray-300 hover:border-[#1B3A6B] bg-white"
        }`}
      >
        <input
          type="file"
          id="knowledgeFileInput"
          accept=".pdf,.docx,.xlsx,.xls,.csv"
          onChange={handleFileInput}
          className="hidden"
        />
        <label
          htmlFor="knowledgeFileInput"
          className="cursor-pointer flex flex-col items-center justify-center space-y-3"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1B3A6B] flex items-center justify-center">
            <UploadCloud className="w-7 h-7 text-[#F5A623]" />
          </div>
          <div>
            <span className="text-sm font-bold text-gray-900 block">
              Drag and drop trade dossiers, lab certificates, or price sheets
            </span>
            <span className="text-xs text-gray-500 mt-1 block">
              Supports PDF, DOCX, Excel spreadsheets up to 25MB per file
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1B3A6B] hover:bg-[#12284b] text-white text-xs font-bold rounded-xl shadow-sm transition">
            <span>Browse Computer</span>
          </span>
        </label>
      </div>

      {uploadSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Document vectorized & ready for AI assistant queries.</span>
        </div>
      )}

      {/* Uploaded Documents Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-subtle overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#1B3A6B] font-serif">
              Indexed Documents ({docs.length})
            </h3>
            <span className="text-xs text-gray-500">
              Total vector index: ~55,670 token embeddings
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gray-100 text-[#1B3A6B] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {doc.type === "EXCEL" ? (
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <FileText className="w-5 h-5 text-[#1B3A6B]" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">
                    {doc.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500 mt-1">
                    <span className="px-2 py-0.5 rounded bg-gray-100 font-semibold text-gray-700">
                      {doc.type}
                    </span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>Uploaded: {doc.uploadDate}</span>
                    <span>•</span>
                    <span className="text-[#1B3A6B] font-medium">{doc.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {statusIcons[doc.status]}
                  <span>{doc.status}</span>
                </span>

                <button
                  type="button"
                  onClick={() => handleDelete(doc.id)}
                  aria-label="Delete document"
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KC_KNOWLEDGE_BASE Static Chunks Section */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-subtle p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F5A623]" />
              <h3 className="text-base font-bold text-[#1B3A6B] font-serif">
                Active Grounded Knowledge Chunks ({filteredChunks.length})
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Production RAG vector space used by the KC AI Sales Assistant
            </p>
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
            {(
              [
                "all",
                "product",
                "process",
                "faq",
                "company",
                "market",
                "certification",
              ] as const
            ).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1 rounded-lg capitalize font-medium transition ${
                  selectedType === t
                    ? "bg-[#1B3A6B] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Chunk List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
          {filteredChunks.map((chunk) => {
            const badgeStyles = {
              product: "bg-blue-50 text-blue-700 border-blue-200",
              process: "bg-purple-50 text-purple-700 border-purple-200",
              faq: "bg-amber-50 text-amber-800 border-amber-200",
              company: "bg-emerald-50 text-emerald-700 border-emerald-200",
              market: "bg-indigo-50 text-indigo-700 border-indigo-200",
              certification: "bg-rose-50 text-rose-700 border-rose-200",
            }[chunk.type];

            return (
              <div
                key={chunk.id}
                className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${badgeStyles}`}
                    >
                      {chunk.type}
                    </span>
                    <span className="font-mono text-[10px] text-gray-400">
                      {chunk.id}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                    {chunk.title}
                  </h4>
                  <p className="text-[11px] text-gray-600 line-clamp-3 mt-1 leading-relaxed">
                    {chunk.content}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-200/60 flex flex-wrap gap-1">
                  {chunk.keywords.slice(0, 4).map((kw, i) => (
                    <span
                      key={i}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-white text-gray-500 border border-gray-200"
                    >
                      #{kw}
                    </span>
                  ))}
                  {chunk.keywords.length > 4 && (
                    <span className="text-[9px] text-gray-400 self-center">
                      +{chunk.keywords.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Document Q&A Testing Panel */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-subtle p-6 space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2 text-[#1B3A6B]">
            <Sparkles className="w-5 h-5 text-[#F5A623]" />
            <h3 className="text-base font-bold font-serif">
              Test Document Q&A (RAG Auditor)
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Audit and verify AI knowledge grounding against specific knowledge chunks
          </p>
        </div>

        <form onSubmit={handleTestQA} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Select Knowledge Chunk
              </label>
              <select
                value={selectedChunkId}
                onChange={(e) => setSelectedChunkId(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-xl text-xs bg-white text-gray-800 focus:ring-2 focus:ring-[#1B3A6B]"
              >
                {KC_KNOWLEDGE_BASE.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.type.toUpperCase()}] {c.title.slice(0, 32)}...
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Question to Ask
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={qaQuestion}
                  onChange={(e) => setQaQuestion(e.target.value)}
                  placeholder="e.g. What is the MOQ or purity specification for this item?"
                  className="flex-1 py-2 px-3 border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-900 focus:ring-2 focus:ring-[#1B3A6B]"
                />
                <button
                  type="submit"
                  disabled={!qaQuestion.trim() || isAskingQA}
                  className="px-4 py-2 bg-[#1B3A6B] hover:bg-[#12284b] text-white text-xs font-bold rounded-xl shadow-xs transition disabled:opacity-50 shrink-0"
                >
                  {isAskingQA ? "Auditing..." : "Ask Q&A"}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Q&A Answer Card */}
        {qaAnswer && (
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1B3A6B] uppercase tracking-wider text-[10px]">
                Verified AI Answer
              </span>
              {qaConfidence && (
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                    qaConfidence === "high"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : qaConfidence === "medium"
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {qaConfidence} confidence
                </span>
              )}
            </div>
            <p className="text-gray-800 leading-relaxed text-xs sm:text-sm">
              {qaAnswer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
