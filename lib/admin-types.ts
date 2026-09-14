// TypeScript definitions for KC Import and Export Admin Module

export type LeadStatus =
  | "new"
  | "contacted"
  | "requirement_confirmed"
  | "quotation_sent"
  | "negotiation"
  | "won"
  | "lost";

export type LeadIntent = "low" | "medium" | "high";

export type LeadSource = "rfq_form" | "ai_chat" | "whatsapp" | "direct";

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  productInterest: string;
  quantity: string;
  destination: string;
  status: LeadStatus;
  intent: LeadIntent;
  notes: string;
  createdAt: string;
  source: LeadSource;
};

export type RFQStatus = "pending" | "reviewed" | "quoted" | "archived";

export type RFQ = {
  id: string;
  leadId: string;
  buyerName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  sku?: string;
  quantity: string;
  destination: string;
  deliveryDate: string;
  specifications: string;
  targetPrice?: string;
  hasAttachment: boolean;
  status: RFQStatus;
  createdAt: string;
  aiSummary: string;
};

export type AdminRole = "Super Admin" | "Admin" | "Editor";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  lastLogin: string;
  status: "Active" | "Inactive";
  avatar?: string;
};

export type KnowledgeDocStatus = "Processing" | "Ready" | "Error";

export type KnowledgeDoc = {
  id: string;
  name: string;
  type: "PDF" | "DOCX" | "EXCEL" | "CSV";
  uploadDate: string;
  size: string;
  status: KnowledgeDocStatus;
  tokensIndexed?: number;
  category: string;
};

export type CertificateStatus = "Valid" | "Expired" | "Pending";

export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  status: CertificateStatus;
  fileLink: string;
  notes: string;
};

export type BlogPostStatus = "Draft" | "Published";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: BlogPostStatus;
  date: string;
  author: string;
  views: number;
};

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  subcategoriesCount: number;
  productsCount: number;
  featured: boolean;
};

export type SiteSettings = {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  socials: {
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  rfqNotificationEmail: string;
  maintenanceMode: boolean;
};
