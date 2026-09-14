"use client";

import React, { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Globe,
  Bell,
  ShieldCheck,
  Save,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sliders,
  ExternalLink,
} from "lucide-react";
import { SiteSettings } from "@/lib/admin-types";

// Default initial settings
const INITIAL_SETTINGS: SiteSettings & {
  iecCode: string;
  gstin: string;
  gaMeasurementId: string;
  currency: string;
  highIntentAlerts: boolean;
  webhookUrl: string;
} = {
  companyName: "KC Import and Export Private Limited",
  tagline: "Bridging Indian Manufacturing & Agricultural Excellence to the World",
  email: "exports@kcimportexport.com",
  phone: "+91 99999 99999",
  whatsapp: "+91 99999 99999",
  address:
    "Plot No. 45, GIDC Industrial Estate, Aji Dam Road, Rajkot - 360003, Gujarat, India",
  socials: {
    linkedin: "https://linkedin.com/company/kc-import-export",
    twitter: "https://twitter.com/kc_export_in",
    facebook: "https://facebook.com/kcimportexport",
  },
  rfqNotificationEmail: "rfq@kcimportexport.com",
  maintenanceMode: false,
  iecCode: "0823901928",
  gstin: "24AABCK1234F1Z5",
  gaMeasurementId: "G-KCEXP88492",
  currency: "USD ($)",
  highIntentAlerts: true,
  webhookUrl: "https://api.kcimportexport.com/v1/webhooks/whatsapp",
};

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState(INITIAL_SETTINGS);
  const [activeTab, setActiveTab] = useState<
    "general" | "notifications" | "integrations" | "system"
  >("general");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    // Mock save delay
    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            System & Enterprise Settings
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Configure business identity, communication routing, and export portal
            parameters.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B3A6B] hover:bg-[#152e55] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <>Saving Settings...</>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Success Toast / Notification */}
      {savedSuccess && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-semibold">Settings successfully updated!</p>
            <p className="text-xs text-emerald-700">
              Your modifications to company profile and communication routing
              have been published.
            </p>
          </div>
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-gray-200 gap-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab("general")}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "general"
              ? "border-[#1B3A6B] text-[#1B3A6B] font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          <Building2 className="w-4 h-4" />
          Company Profile
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "notifications"
              ? "border-[#1B3A6B] text-[#1B3A6B] font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          <Bell className="w-4 h-4" />
          RFQ & Lead Routing
        </button>
        <button
          onClick={() => setActiveTab("integrations")}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "integrations"
              ? "border-[#1B3A6B] text-[#1B3A6B] font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          <Globe className="w-4 h-4" />
          Integrations & Social
        </button>
        <button
          onClick={() => setActiveTab("system")}
          className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === "system"
              ? "border-[#1B3A6B] text-[#1B3A6B] font-semibold"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          <Sliders className="w-4 h-4" />
          System & Maintenance
        </button>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tab 1: General Company Profile */}
        {activeTab === "general" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 shadow-xs">
            <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">
              Corporate Legal Identity
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Registered Enterprise Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B3A6B] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) =>
                    setFormData({ ...formData, tagline: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B3A6B] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Import Export Code (IEC)
                </label>
                <input
                  type="text"
                  value={formData.iecCode}
                  onChange={(e) =>
                    setFormData({ ...formData, iecCode: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#1B3A6B] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  GSTIN / Tax Identification
                </label>
                <input
                  type="text"
                  value={formData.gstin}
                  onChange={(e) =>
                    setFormData({ ...formData, gstin: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#1B3A6B] outline-hidden"
                />
              </div>
            </div>

            <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 pt-4">
              Commercial Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Primary Commercial Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B3A6B] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Export Desk Telephone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B3A6B] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  WhatsApp Business Hotline
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B3A6B] outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Corporate & Port Export Facility Address
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B3A6B] outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: RFQ & Lead Routing */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 shadow-xs">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Inquiry Dispatch & Notification Rules
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Ensure commercial buyer inquiries are immediately delivered to sales officers.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Primary RFQ Notification Inbox
                </label>
                <input
                  type="email"
                  value={formData.rfqNotificationEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rfqNotificationEmail: e.target.value,
                    })
                  }
                  className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B3A6B] outline-hidden"
                />
                <p className="text-xs text-gray-500 mt-1">
                  All website RFQ submissions and AI-assisted RFQs trigger an immediate alert to this address.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  WhatsApp CRM Webhook Endpoint
                </label>
                <input
                  type="text"
                  value={formData.webhookUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, webhookUrl: e.target.value })
                  }
                  className="w-full max-w-lg px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono text-gray-800 focus:ring-2 focus:ring-[#1B3A6B] outline-hidden"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Payloads sent to your CRM or WhatsApp Business Cloud API when leads initiate chats.
                </p>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.highIntentAlerts}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        highIntentAlerts: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded border-gray-300 text-[#1B3A6B] focus:ring-[#1B3A6B]"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      High-Intent Instant Escalation
                    </span>
                    <p className="text-xs text-gray-500">
                      Send urgent SMS & WhatsApp alerts to management when buyers request &gt;50 metric tons or full container loads.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Integrations & Social */}
        {activeTab === "integrations" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 shadow-xs">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Analytics & Social Footprint
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Connect external tracking IDs and public trade profiles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Google Analytics 4 Measurement ID
                </label>
                <input
                  type="text"
                  value={formData.gaMeasurementId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gaMeasurementId: e.target.value,
                    })
                  }
                  placeholder="G-XXXXXXXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#1B3A6B] outline-hidden"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tracks global visitors, catalog views, and RFQ form conversions.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Default Display Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B3A6B] outline-hidden"
                >
                  <option value="USD ($)">USD ($) - US Dollar</option>
                  <option value="EUR (€)">EUR (€) - Euro</option>
                  <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                  <option value="AED (د.إ)">AED (د.إ) - UAE Dirham</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  LinkedIn Company URL
                </label>
                <input
                  type="url"
                  value={formData.socials.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: {
                        ...formData.socials,
                        linkedin: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B3A6B] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Twitter / X Profile
                </label>
                <input
                  type="url"
                  value={formData.socials.twitter}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: {
                        ...formData.socials,
                        twitter: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1B3A6B] outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: System & Maintenance */}
        {activeTab === "system" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 shadow-xs">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Portal Operations & Security
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage portal visibility, maintenance mode, and security checkpoints.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-amber-900">
                    Maintenance Mode
                  </h3>
                  <p className="text-xs text-amber-700 mt-0.5">
                    When active, public visitors see a polite maintenance notice while admin users retain full dashboard access.
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.maintenanceMode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maintenanceMode: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>

            <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>SSL Encryption active (TLS 1.3)</span>
              </div>
              <span className="font-mono">Portal Build v3.4.1</span>
            </div>
          </div>
        )}

        {/* Bottom Save Trigger */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setFormData(INITIAL_SETTINGS)}
            className="px-4 py-2 border border-gray-200 bg-white text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
          >
            Reset to Defaults
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 bg-[#1B3A6B] hover:bg-[#152e55] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
