"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Product } from "@/lib/products";
import { RFQ_COUNTRIES } from "@/lib/constants";
import {
  X,
  Send,
  CheckCircle2,
  UploadCloud,
  FileCheck,
  Building,
  User,
  Mail,
  Phone,
  Globe,
  Layers,
  Anchor,
  Calendar,
  DollarSign,
  Info,
  ShieldCheck,
} from "lucide-react";

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export default function RFQModal({ isOpen, onClose, product }: RFQModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    businessEmail: "",
    phoneWhatsapp: "",
    country: "",
    quantity: "",
    destinationPort: "",
    deliveryDate: "",
    specifications: "",
    targetPrice: "",
    fileName: "",
    privacyConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const reduced = useReducedMotion();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setIsSubmitted(false);
      setErrorMessage("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage("File size exceeds 10MB limit.");
        return;
      }
      setErrorMessage("");
      setFormData((prev) => ({ ...prev, fileName: file.name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !formData.fullName ||
      !formData.companyName ||
      !formData.businessEmail ||
      !formData.phoneWhatsapp ||
      !formData.country ||
      !formData.quantity
    ) {
      setErrorMessage("Please complete all required fields marked with an asterisk (*).");
      return;
    }

    if (!formData.privacyConsent) {
      setErrorMessage("Please confirm privacy consent before submitting.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.01 : 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="rfq-modal-title"
        >
          <motion.div
            initial={reduced ? { opacity: 0 } : { scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25, duration: reduced ? 0.01 : 0.25 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#1B3A6B] text-white border-b border-[#12284b]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F5A623]">
                  Direct B2B Commercial Inquiry
                </span>
                <h2 id="rfq-modal-title" className="text-lg sm:text-xl font-bold font-serif">
                  Request a Formal Quote
                </h2>
                {product && (
                  <p className="text-xs text-gray-200 mt-0.5 truncate max-w-md">
                    Item: <strong className="text-white">{product.name}</strong> ({product.sku})
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close RFQ Modal"
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              {isSubmitted ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: reduced ? 0 : 0.12 }
                    }
                  }}
                  className="py-8 text-center space-y-4"
                >
                  <motion.div
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      visible: {
                        scale: 1,
                        opacity: 1,
                        transition: { type: "spring", stiffness: 400, damping: 18 }
                      }
                    }}
                    className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200 shadow-md"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full uppercase tracking-wider"
                  >
                    RFQ Logged #KC-{Math.floor(100000 + Math.random() * 900000)}
                  </motion.span>
                  <motion.h3
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="text-2xl font-bold text-[#1B3A6B] font-serif"
                  >
                    Thank you! Our team will contact you within 24 hours.
                  </motion.h3>
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed"
                  >
                    Your request for <strong>{product ? product.name : "catalog products"}</strong> has
                    been dispatched directly to our Rajkot export documentation desk.
                  </motion.p>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="pt-4"
                  >
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-[#1B3A6B] text-white text-sm font-semibold rounded-lg hover:bg-[#12284b] transition shadow-sm"
                    >
                      Close & Return to Catalog
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Badge in Form */}
              {product && (
                <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-xs text-gray-700 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#1B3A6B] block">
                      Target Product: {product.name}
                    </span>
                    <span className="text-gray-500">
                      SKU: {product.sku} • Standard MOQ: {product.moq}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-white border border-blue-200 rounded text-[11px] font-bold text-[#1B3A6B]">
                    {product.category}
                  </span>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded flex items-center gap-2">
                  <Info className="w-4 h-4 flex-shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Row 1: Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. William Smith"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      name="companyName"
                      required
                      placeholder="e.g. Apex Global Supply"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B]"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      name="businessEmail"
                      required
                      placeholder="procurement@apex.com"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      name="phoneWhatsapp"
                      required
                      placeholder="+1 (555) 234-5678"
                      value={formData.phoneWhatsapp}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B]"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Country & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Destination Country <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <select
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B] bg-white"
                    >
                      <option value="">Select Country</option>
                      {RFQ_COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Required Quantity <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Layers className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      name="quantity"
                      required
                      placeholder="e.g. 1x 20ft FCL / 5,000 units"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B]"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Port & Target Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Destination Port / City
                  </label>
                  <div className="relative">
                    <Anchor className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      name="destinationPort"
                      placeholder="e.g. Port of Rotterdam / Houston"
                      value={formData.destinationPort}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Target Price (Optional)
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      name="targetPrice"
                      placeholder="e.g. $1,400 / MT FOB"
                      value={formData.targetPrice}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B]"
                    />
                  </div>
                </div>
              </div>

              {/* Row 5: Notes */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Customization & Technical Requirements
                </label>
                <textarea
                  name="specifications"
                  rows={2}
                  placeholder="Mention tolerances, packaging labeling, private branding or certification requirements..."
                  value={formData.specifications}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B3A6B]"
                />
              </div>

              {/* Row 6: File attachment */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Technical Drawings / Spec Sheet (Optional)
                </label>
                <div className="border border-dashed border-gray-300 rounded-lg p-2.5 text-center hover:border-[#1B3A6B] bg-gray-50/60">
                  <input
                    type="file"
                    id="modalRfqFile"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="modalRfqFile"
                    className="cursor-pointer flex items-center justify-center gap-2 text-xs text-gray-600"
                  >
                    {formData.fileName ? (
                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                        <FileCheck className="w-4 h-4" />
                        {formData.fileName}
                      </span>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4 text-[#1B3A6B]" />
                        <span className="font-medium text-[#1B3A6B]">Upload document (Max 10MB)</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Privacy Consent */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="modalPrivacyConsent"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleChange}
                  required
                  className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-[#1B3A6B] focus:ring-[#1B3A6B]"
                />
                <label htmlFor="modalPrivacyConsent" className="text-[11px] text-gray-500 leading-snug">
                  I consent to KC Import and Export processing my commercial inquiry and providing container export quotation. <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#F5A623] hover:bg-[#e09315] text-[#1B3A6B] font-bold text-xs sm:text-sm rounded-lg shadow transition disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting RFQ...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Commercial Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
