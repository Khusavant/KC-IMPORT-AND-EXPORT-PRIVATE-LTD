import type { Metadata } from "next";
import RFQForm from "@/components/ui/RFQForm";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import {
  COMPANY_NAME,
  COMPANY_SHORT_NAME,
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_WHATSAPP_LINK,
} from "@/lib/constants";
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Clock,
  Building2,
  ShieldCheck,
  Ship,
  Globe2,
} from "lucide-react";

import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Request a Quote & Contact Export Desk | KC Import Export",
  description:
    "Submit your Request for Quotation (RFQ) directly to KC Import and Export Private Limited in Rajkot, Gujarat. Rapid FOB/CIF quotations and container logistics.",
  keywords:
    "rfq india export, contact rajkot exporter, gujarat export desk, quote for cumin brass parts cotton",
  alternates: { canonical: "https://kcimportexport.com/contact" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KC Import and Export Private Limited",
    title: "Request a Quote & Contact Export Desk | KC Import Export",
    description:
      "Submit your Request for Quotation (RFQ) directly to KC Import and Export Private Limited in Rajkot, Gujarat. Rapid FOB/CIF quotations and container logistics.",
    url: "https://kcimportexport.com/contact",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kcimportexport",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": COMPANY_NAME,
    "image": "https://www.kcimportexport.com/images/cat-agricultural.jpg",
    "telephone": COMPANY_PHONE,
    "email": COMPANY_EMAIL,
    "url": "https://www.kcimportexport.com/contact",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY_ADDRESS.street,
      "addressLocality": COMPANY_ADDRESS.city,
      "addressRegion": COMPANY_ADDRESS.state,
      "postalCode": COMPANY_ADDRESS.postalCode,
      "addressCountry": "IN",
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00",
    },
    "priceRange": "$$",
  };

  return (
    <div className="bg-[#F8F9FA] py-12 sm:py-16">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://kcimportexport.com" },
          { name: "Contact & RFQ", url: "https://kcimportexport.com/contact" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#1B3A6B] uppercase tracking-wider">
            Commercial Export Desk
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B3A6B] font-serif">
            Request a Quote / Contact Us
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Connect directly with our export logistics and sourcing specialists in Rajkot.
            Fill out the formal RFQ below or message our desk on WhatsApp for immediate assistance.
          </p>
        </div>

        {/* 2-Column Grid: Form (Left 7 cols) & Contact Info / Map (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: RFQ Form */}
          <div className="lg:col-span-7">
            <RFQForm />
          </div>

          {/* Right Column: Contact Details, WhatsApp CTA, and Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-gray-200/80 space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#1B3A6B] text-white flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#F5A623]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1B3A6B] font-serif">
                    {COMPANY_SHORT_NAME}
                  </h3>
                  <span className="text-xs text-gray-500">
                    B2B Export Headquarters
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#F5A623] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-gray-900 text-xs uppercase tracking-wider">
                      Physical Location
                    </span>
                    <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">
                      {COMPANY_ADDRESS.formatted}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#F5A623] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-gray-900 text-xs uppercase tracking-wider">
                      Commercial Email
                    </span>
                    <a
                      href={`mailto:${COMPANY_EMAIL}`}
                      className="text-gray-600 hover:text-[#1B3A6B] text-xs mt-0.5 block transition"
                    >
                      {COMPANY_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#F5A623] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-gray-900 text-xs uppercase tracking-wider">
                      Direct Telephone
                    </span>
                    <a
                      href={`tel:${COMPANY_PHONE.replace(/\s+/g, "")}`}
                      className="text-gray-600 hover:text-[#1B3A6B] text-xs mt-0.5 block transition"
                    >
                      {COMPANY_PHONE}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#F5A623] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-gray-900 text-xs uppercase tracking-wider">
                      Operating Hours (IST)
                    </span>
                    <p className="text-gray-600 text-xs mt-0.5">
                      Mon – Sat: 09:30 AM – 07:00 PM (GMT +5:30)
                      <span className="block text-emerald-600 font-medium mt-0.5">
                        24/7 International Desk via WhatsApp
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-2 border-t border-gray-100">
                <WhatsAppButton
                  variant="inline"
                  className="w-full"
                  label="Direct WhatsApp RFQ Hotline"
                />
              </div>
            </div>

            {/* Maritime Ports Hub Card */}
            <div className="bg-[#1B3A6B] text-white rounded-2xl p-6 shadow-card space-y-4">
              <div className="flex items-center gap-3">
                <Ship className="w-6 h-6 text-[#F5A623]" />
                <h4 className="text-base font-bold font-serif">
                  Proximity to Major Gujarat Ports
                </h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Direct road and rail freight corridors connect our Rajkot staging center
                directly to <strong>Mundra Port (240 km)</strong> and{" "}
                <strong>Kandla Port (215 km)</strong>, ensuring swift customs clearance
                and minimal dwell time for container shipments.
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold text-amber-300 pt-1">
                <span>• Mundra (INMUN1)</span>
                <span>• Kandla (INIXY1)</span>
                <span>• Pipavav (INPAV1)</span>
              </div>
            </div>

            {/* Google Maps Iframe Placeholder */}
            <div className="bg-white rounded-2xl p-3 shadow-card border border-gray-200/80">
              <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-gray-100">
                <iframe
                  title="KC Import & Export Rajkot Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.6820202796!2d70.73889445831627!3d22.273630793617387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3b!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
              <div className="p-3 text-center text-xs text-gray-500">
                <span>Rajkot, Gujarat, India • Global Export Desk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
