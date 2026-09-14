// Brand Design System & Company Information Constants
// KC Import and Export Private Limited — Rajkot, Gujarat, India

export const BRAND_COLORS = {
  primary: "#1B3A6B", // Deep Navy
  accent: "#F5A623", // Amber / Warm Gold
  background: "#F8F9FA", // Off-white Clean B2B Background
  text: "#1A1A1A", // High-contrast Charcoal
  border: "#E5E7EB", // Subtle Gray Border
  muted: "#6B7280", // Secondary text
} as const;

// Company Contact & Profile Details
// TODO: replace with real data
export const COMPANY_NAME = "KC Import and Export Private Limited";

// TODO: replace with real data
export const COMPANY_SHORT_NAME = "KC Import & Export";

// TODO: replace with real data
export const COMPANY_TAGLINE = "Your Reliable India-Based Export Partner";

// TODO: replace with real data
export const COMPANY_EMAIL = "exports@kcimportexport.com";

// TODO: replace with real data
export const COMPANY_PHONE = "+91 99999 99999";

// TODO: replace with real data
export const COMPANY_WHATSAPP = "+91 99999 99999";

// TODO: replace with real data
export const COMPANY_WHATSAPP_LINK = "https://wa.me/919999999999";

// TODO: replace with real data
export const COMPANY_ADDRESS = {
  street: "Aji GIDC Industrial Area, Phase-II, Plot No. 104", // TODO: replace with real data
  city: "Rajkot",
  state: "Gujarat",
  postalCode: "360003", // TODO: replace with real data
  country: "India",
  formatted: "Plot No. 104, Phase-II, Aji GIDC, Rajkot, Gujarat 360003, India", // TODO: replace with real data
};

// Primary Navigation Links
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Why KC", href: "/why-kc" },
  { label: "Export Process", href: "/export-process" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Footer Navigation Links
export const FOOTER_LINKS = {
  navigation: [
    { label: "Product Catalog", href: "/products" },
    { label: "Industries Served", href: "/industries" },
    { label: "Why Choose KC", href: "/why-kc" },
    { label: "8-Step Export Process", href: "/export-process" },
    { label: "Trade Blog & Guides", href: "/blog" },
    { label: "About Us", href: "/about" },
    { label: "Contact & RFQ", href: "/contact" },
  ],
  support: [
    { label: "Request a Quote", href: "/contact" },
    { label: "Compliance & Standards", href: "/why-kc" },
    { label: "Packaging & Logistics", href: "/export-process" },
    { label: "Terms of Trade (Incoterms)", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

// 6 Product Categories (Lucide icon names are mapped in UI components)
export const PRODUCT_CATEGORIES = [
  {
    id: "agricultural-products",
    name: "Agricultural Products",
    description:
      "Premium Indian spices, oilseeds, organic grains, and cumin sourced directly from Saurashtra farming cooperatives.",
    icon: "Wheat",
    image: "/images/cat-agricultural.png",
    // TODO: replace with real data
    featuredCount: "40+ Export Grades",
  },
  {
    id: "industrial-components",
    name: "Industrial Components",
    description:
      "Precision brass components, investment casting parts, auto ancillaries, and CNC machined engineering hardware.",
    icon: "Cog",
    image: "/images/cat-industrial.png",
    // TODO: replace with real data
    featuredCount: "Micron Precision Tolerances",
  },
  {
    id: "textiles",
    name: "Textiles & Garments",
    description:
      "Raw cotton bails, organic yarn, technical woven fabrics, and finished garments manufactured across Gujarat textile hubs.",
    icon: "Shirt",
    image: "/images/cat-textiles.png",
    // TODO: replace with real data
    featuredCount: "OEKO-TEX Certified Partners",
  },
  {
    id: "food-products",
    name: "Processed Food Products",
    description:
      "Dehydrated onion and garlic flakes, IQF frozen fruits, mango pulp, and peanut butter meeting USFDA & EU standards.",
    icon: "Utensils",
    image: "/images/cat-food.png",
    // TODO: replace with real data
    featuredCount: "BRC & ISO 22000 Compliant",
  },
  {
    id: "hardware-tools",
    name: "Hardware & Tools",
    description:
      "Architectural hardware, stainless steel fasteners, forged hand tools, and bearing assemblies made in Rajkot industrial belt.",
    icon: "Wrench",
    image: "/images/cat-hardware.png",
    // TODO: replace with real data
    featuredCount: "Heavy Duty Industrial Grade",
  },
  {
    id: "consumer-goods",
    name: "Consumer Goods & Ceramics",
    description:
      "Ceramic vitrified tiles, sanitaryware, stainless steel kitchenware, and eco-friendly consumer packaging solutions.",
    icon: "Package",
    image: "/images/cat-consumer.png",
    // TODO: replace with real data
    featuredCount: "Custom Retail Packaging",
  },
] as const;

// 4 Company Snapshot Stats
export const COMPANY_STATS = [
  {
    label: "Years in Business",
    value: "12+",
    status: "[TO BE CONFIRMED]", // Clearly marked as requested
    subtext: "Established export footprint",
  },
  {
    label: "Products Exported",
    value: "250+",
    status: "[TO BE CONFIRMED]", // Clearly marked as requested
    subtext: "Across 6 core industrial sectors",
  },
  {
    label: "Countries Served",
    value: "35+",
    status: "[TO BE CONFIRMED]", // Clearly marked as requested
    subtext: "North America, EU, Middle East, APAC",
  },
  {
    label: "Happy Clients",
    value: "180+",
    status: "[TO BE CONFIRMED]", // Clearly marked as requested
    subtext: "Long-term B2B procurement relationships",
  },
] as const;

// 6 Differentiators (Why KC)
export const WHY_KC_POINTS = [
  {
    id: "quality-assurance",
    title: "Rigorous Quality Assurance",
    description:
      "Multi-stage pre-shipment inspections (SGS/Bureau Veritas compatible) ensuring zero defects and strict global spec adherence.",
    icon: "ShieldCheck",
  },
  {
    id: "export-documentation",
    title: "Flawless Export Documentation",
    description:
      "End-to-end management of Bills of Lading, Certificate of Origin, Phyto-sanitary, COO, and custom regulatory filings.",
    icon: "FileText",
  },
  {
    id: "reliable-packaging",
    title: "Seaworthy & Cargo Packaging",
    description:
      "Palletized, moisture-barrier, and tamper-evident export packaging designed to survive rough ocean transit safely.",
    icon: "PackageCheck",
  },
  {
    id: "fast-communication",
    title: "24/7 Fast Communication",
    description:
      "Dedicated key account managers providing real-time production updates, container tracking, and rapid turnaround.",
    icon: "Clock",
  },
  {
    id: "competitive-pricing",
    title: "Direct Hub Competitive Pricing",
    description:
      "Direct factory gate procurement in Rajkot, Jamnagar, and Morbi manufacturing corridors eliminating unnecessary middlemen margins.",
    icon: "Coins",
  },
  {
    id: "verified-sourcing",
    title: "100% Verified Sourcing",
    description:
      "Vetted Gujarat manufacturing plants with certified labor, ethical practices, and audited production capacities.",
    icon: "BadgeCheck",
  },
] as const;

// 8-Step Export Process
export const EXPORT_STEPS = [
  {
    step: "01",
    title: "Inquiry",
    description: "Submit product specifications, technical drawings, or target volume requirements.",
    icon: "MailQuestion",
  },
  {
    step: "02",
    title: "Quotation",
    description: "Receive competitive FOB/CIF/CFR pricing, lead time estimates, and sample terms.",
    icon: "Calculator",
  },
  {
    step: "03",
    title: "Confirmation",
    description: "Sample approval, purchase order formalization, and LC / contract finalization.",
    icon: "ClipboardCheck",
  },
  {
    step: "04",
    title: "Production / Sourcing",
    description: "Scheduled manufacturing batch run under strict timeline and raw material supervision.",
    icon: "Factory",
  },
  {
    step: "05",
    title: "Quality Check",
    description: "Comprehensive QA testing, batch lab analysis, and pre-dispatch inspection reports.",
    icon: "CheckCircle2",
  },
  {
    step: "06",
    title: "Documentation",
    description: "Issuance of customs invoices, packing lists, inspection certificates, and insurance.",
    icon: "FileCheck",
  },
  {
    step: "07",
    title: "Shipping",
    description: "Container stuffing and vessel loading via Kandla, Mundra, or Pipavav Gujarat ports.",
    icon: "Ship",
  },
  {
    step: "08",
    title: "Delivery",
    description: "Safe destination port arrival, BL handover, and post-delivery client verification.",
    icon: "Anchor",
  },
] as const;

// Common Countries for RFQ Dropdown
export const RFQ_COUNTRIES = [
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Saudi Arabia",
  "Germany",
  "Australia",
  "Canada",
  "Singapore",
  "Netherlands",
  "South Africa",
  "Japan",
  "France",
  "Italy",
  "Spain",
  "Malaysia",
  "Vietnam",
  "Kenya",
  "Nigeria",
  "Egypt",
  "Brazil",
  "Other (Specify in notes)",
] as const;
