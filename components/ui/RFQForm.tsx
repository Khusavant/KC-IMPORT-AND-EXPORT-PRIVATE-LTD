"use client";

import React, { useState } from "react";
import {
  PRODUCT_CATEGORIES,
  RFQ_COUNTRIES,
  BRAND_COLORS,
} from "@/lib/constants";
import {
  Send,
  CheckCircle2,
  UploadCloud,
  FileCheck,
  Building,
  User,
  Mail,
  Phone,
  Globe,
  Package,
  Layers,
  Anchor,
  Calendar,
  DollarSign,
  Info,
} from "lucide-react";

interface RFQFormData {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phoneWhatsapp: string;
  country: string;
  category: string;
  quantity: string;
  destinationPort: string;
  deliveryDate: string;
  specifications: string;
  targetPrice: string;
  fileName: string;
  privacyConsent: boolean;
}

const INITIAL_FORM_STATE: RFQFormData = {
  fullName: "",
  companyName: "",
  businessEmail: "",
  phoneWhatsapp: "",
  country: "",
  category: "",
  quantity: "",
  destinationPort: "",
  deliveryDate: "",
  specifications: "",
  targetPrice: "",
  fileName: "",
  privacyConsent: false,
};

export default function RFQForm() {
  const [formData, setFormData] = useState<RFQFormData>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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
        setErrorMessage("File size exceeds maximum 10MB limit.");
        return;
      }
      setErrorMessage("");
      setFormData((prev) => ({ ...prev, fileName: file.name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate mandatory fields
    if (
      !formData.fullName ||
      !formData.companyName ||
      !formData.businessEmail ||
      !formData.phoneWhatsapp ||
      !formData.country ||
      !formData.category ||
      !formData.quantity
    ) {
      setErrorMessage("Please fill in all mandatory fields marked with an asterisk (*).");
      return;
    }

    if (!formData.privacyConsent) {
      setErrorMessage("Please confirm privacy consent to submit your export RFQ.");
      return;
    }

    setIsSubmitting(true);

    // Simulate network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setIsSubmitted(false);
    setErrorMessage("");
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-card border border-emerald-100 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 border border-emerald-200">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
          RFQ Reference #KC-{Math.floor(100000 + Math.random() * 900000)}
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#1B3A6B] mb-3">
          Thank you! Our team will contact you within 24 hours.
        </h3>
        <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed max-w-lg mx-auto">
          We have received your commercial inquiry for{" "}
          <strong className="text-gray-900">{formData.category}</strong>. Our export
          desk in Rajkot is reviewing your requirements and preparing a customized
          FOB/CIF quote.
        </p>
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-8 text-left text-xs sm:text-sm text-gray-700 space-y-1.5">
          <p><span className="font-semibold text-gray-900">Buyer:</span> {formData.fullName} ({formData.companyName})</p>
          <p><span className="font-semibold text-gray-900">Destination:</span> {formData.country} {formData.destinationPort ? `— Port: ${formData.destinationPort}` : ""}</p>
          <p><span className="font-semibold text-gray-900">Volume:</span> {formData.quantity}</p>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center justify-center px-6 py-3 bg-[#1B3A6B] text-white text-sm font-semibold rounded-lg hover:bg-[#12284b] transition-all shadow-sm"
        >
          Submit Another Commercial Inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 sm:p-10 shadow-card border border-gray-200/80"
    >
      <div className="border-b border-gray-100 pb-5 mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-[#1B3A6B]">
          Request for Quotation (RFQ)
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          Receive tailored FOB / CIF container pricing directly from our Rajkot export desk.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded flex items-center gap-3">
          <Info className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Contact Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              placeholder="e.g. Johnathan Davis"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="companyName"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Company Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              id="companyName"
              name="companyName"
              required
              placeholder="e.g. Davis Global Trading Ltd"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Email & Phone/WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label
            htmlFor="businessEmail"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Business Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              id="businessEmail"
              name="businessEmail"
              required
              placeholder="procurement@company.com"
              value={formData.businessEmail}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phoneWhatsapp"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Phone / WhatsApp <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="tel"
              id="phoneWhatsapp"
              name="phoneWhatsapp"
              required
              placeholder="+1 (555) 019-2834"
              value={formData.phoneWhatsapp}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition"
            />
          </div>
        </div>
      </div>

      {/* Row 3: Country & Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label
            htmlFor="country"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Destination Country <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition bg-white"
            >
              <option value="">Select Target Country</option>
              {RFQ_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Product / Category of Interest <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Package className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition bg-white"
            >
              <option value="">Select Category</option>
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
              <option value="Other / Custom Sourcing">Other / Custom Sourcing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Row 4: Quantity & Destination Port */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label
            htmlFor="quantity"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Required Quantity <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Layers className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              id="quantity"
              name="quantity"
              required
              placeholder="e.g. 1x 20ft Container / 50 Metric Tons"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="destinationPort"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Destination Port / City
          </label>
          <div className="relative">
            <Anchor className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              id="destinationPort"
              name="destinationPort"
              placeholder="e.g. Port of Rotterdam / Jebel Ali / Houston"
              value={formData.destinationPort}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition"
            />
          </div>
        </div>
      </div>

      {/* Row 5: Delivery Date & Target Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div>
          <label
            htmlFor="deliveryDate"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Required Delivery Date
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="targetPrice"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
          >
            Target Price (Optional)
          </label>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              id="targetPrice"
              name="targetPrice"
              placeholder="e.g. $1,200 / MT FOB Mundra"
              value={formData.targetPrice}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition"
            />
          </div>
        </div>
      </div>

      {/* Row 6: Specifications & Notes */}
      <div className="mb-5">
        <label
          htmlFor="specifications"
          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5"
        >
          Specifications / Customization Notes
        </label>
        <textarea
          id="specifications"
          name="specifications"
          rows={3}
          placeholder="Mention technical specifications, grade, custom packaging requirements, test reports needed, or inspection standards..."
          value={formData.specifications}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent transition"
        />
      </div>

      {/* Row 7: File Upload */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
          Attach Specification / Drawing / PO (Optional — max 10MB)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-[#1B3A6B] transition bg-gray-50/50">
          <input
            type="file"
            id="rfqFile"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="rfqFile"
            className="cursor-pointer flex flex-col items-center justify-center gap-1"
          >
            {formData.fileName ? (
              <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                <FileCheck className="w-5 h-5" />
                <span>Selected: {formData.fileName}</span>
              </div>
            ) : (
              <>
                <UploadCloud className="w-7 h-7 text-gray-400" />
                <span className="text-xs font-medium text-[#1B3A6B]">
                  Click to upload technical documents
                </span>
                <span className="text-[11px] text-gray-500">
                  Accepted formats: PDF, JPG, PNG, Excel, Word (Up to 10MB)
                </span>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Privacy Consent */}
      <div className="mb-6 flex items-start gap-3">
        <input
          type="checkbox"
          id="privacyConsent"
          name="privacyConsent"
          checked={formData.privacyConsent}
          onChange={handleChange}
          required
          className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1B3A6B] focus:ring-[#1B3A6B]"
        />
        <label htmlFor="privacyConsent" className="text-xs text-gray-600 leading-relaxed">
          I consent to KC Import and Export storing my commercial contact details to respond to
          this export inquiry and provide quotation updates in accordance with international B2B trade practices. <span className="text-red-500">*</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#F5A623] hover:bg-[#e09315] text-[#1B3A6B] font-bold text-sm sm:text-base rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <span className="inline-block animate-spin h-4 w-4 border-2 border-[#1B3A6B] border-t-transparent rounded-full" />
            <span>Processing Inquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Inquiry</span>
          </>
        )}
      </button>
    </form>
  );
}
