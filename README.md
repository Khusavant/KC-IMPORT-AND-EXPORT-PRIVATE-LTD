# KC Import and Export Private Limited — B2B Global Trade Platform

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)
![Groq](https://img.shields.io/badge/AI-Groq%20Llama%203.3-orange)
![Pages](https://img.shields.io/badge/Pages-84%20Static-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Live Demo
[https://kc-import-export.vercel.app](https://kc-import-export.vercel.app)

> **Direct Gujarat Export House** • Rajkot, Gujarat, India  
> Enterprise B2B Export Procurement & Logistics Portal built with Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide React, and Groq-powered AI RAG Sales Assistant.

---

## 🚀 Key Highlights & Architecture

### 1. High-Performance Modern Stack
- **Framework**: Next.js 14 (App Router) with full Static Site Generation (SSG) for 12 core product catalog pages and 5 SEO trade guides.
- **Language**: TypeScript with strict type-safety (`noImplicitAny: true`, clean type contracts).
- **Styling**: Tailwind CSS with curated brand palette (Deep Navy `#1B3A6B`, Amber Gold `#F5A623`, Off-white `#F8F9FA`).
- **Icons**: 100% Lucide React icons (Strict zero-emoji compliance).
- **Fonts**: Inter (UI / data tables) & Playfair Display (editorial headings).

### 2. Groq-Powered AI Sales & Trade Assistant
- **Architecture**: Retrieval-Augmented Generation (RAG) using cosine similarity over localized Gujarat export knowledge vectors.
- **Multi-Model Fallback Engine**: Primary inference powered by `openai/gpt-oss-120b` with seamless fallback loop to `llama-3.3-70b-versatile`, `llama-3.1-70b-versatile`, and `qwen/qwen3.8-27b` to guarantee 100% uptime.
- **Multilingual Support**: Real-time language detection responding natively in Hindi, Gujarati, English, and Arabic with active badge indicators in the chat header.
- **B2B AI Features**:
  - Commercial intent scoring & signal analysis (`/api/lead-score`)
  - AI-generated formal B2B sales email drafts (`/api/sales-email`)
  - RAG document auditor & compliance Q&A (`/api/doc-qa`)
  - Strategic follow-up recommendations for sales desks (`/api/followup-suggestions`)

### 3. SEO & International Discoverability
- **Dynamic XML Sitemap**: Generated automatically via `app/sitemap.ts` for all static routes, 12 products, and 5 blog guides.
- **Crawler Directives**: `app/robots.ts` with API and admin path protection.
- **Structured Data (JSON-LD)**:
  - `Organization` on Homepage
  - `Product` & `AggregateOffer` on Product detail pages
  - `HowTo` on 8-Step Export Process
  - `LocalBusiness` on Contact & RFQ Desk
- **Social Graph Sharing**: Dynamic OpenGraph image generation via `next/og` (`app/opengraph-image.tsx` and `app/products/[slug]/opengraph-image.tsx`).

### 4. Production Hardening & Security
- **Edge Rate Limiting**: In-memory IP rate limiter on all `/api/*` routes (30 requests / minute) via `middleware.ts`.
- **Security Headers**: Configured in `next.config.mjs` (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`).
- **Input Sanitization**: Server-side HTML stripping and payload validation (`lib/input-validator.ts`).
- **Structured Error Logging**: Centralized error logging utility (`lib/error-logger.ts`).
- **Legal Compliance**: Complete Privacy Policy (`/privacy`), Terms of Trade (`/terms`), and persistent Cookie Consent banner (`components/ui/CookieBanner.tsx`).

---

## 📂 Project Structure

```bash
├── app/
│   ├── layout.tsx                     # Root layout with SEO metadata and font definitions
│   ├── page.tsx                       # Homepage with Hero, Categories, Trust Pillars, Snapshot
│   ├── sitemap.ts                     # Dynamic XML Sitemap generator
│   ├── robots.ts                      # Dynamic robots.txt
│   ├── opengraph-image.tsx            # Global dynamic OpenGraph image
│   ├── not-found.tsx                  # Branded 404 error page
│   ├── error.tsx                      # Branded global error boundary
│   ├── about/page.tsx                 # Company history, mission, Rajkot hub details
│   ├── contact/page.tsx               # RFQ submission form and export desk coordinates
│   ├── products/
│   │   ├── page.tsx                   # Product catalog listing with search & filters
│   │   ├── loading.tsx                # Catalog skeleton loader
│   │   └── [slug]/
│   │       ├── page.tsx               # Static product detail with JSON-LD schema
│   │       ├── loading.tsx            # Product detail skeleton loader
│   │       └── opengraph-image.tsx    # Dynamic product OG card generator
│   ├── blog/
│   │   ├── page.tsx                   # B2B export guides & trade insights listing
│   │   ├── loading.tsx                # Blog skeleton loader
│   │   └── [slug]/
│   │       ├── page.tsx               # Full article reader with related posts
│   │       └── loading.tsx            # Article skeleton loader
│   ├── industries/page.tsx            # Target export industries served
│   ├── why-kc/page.tsx                # Competitive advantages and quality accreditations
│   ├── export-process/page.tsx        # Interactive 8-step export lifecycle
│   ├── privacy/page.tsx               # Data privacy and non-disclosure standards
│   ├── terms/page.tsx                 # Incoterms 2020 rules and commercial conditions
│   ├── admin/                         # Internal CRM, RFQ manager, and AI knowledge auditor
│   └── api/                           # Secure server-side AI endpoints
├── components/
│   ├── layout/                        # Navbar, Footer, PublicShell
│   ├── home/                          # Hero, CategoryCards, CompanySnapshot, WhyKC, FinalCTA
│   ├── products/                      # ProductGrid, ProductCard, ProductFilters, ProductDetail
│   ├── ai/                            # AIChatWidget, ChatMessage, ChatInput, LeadScoreBadge
│   ├── admin/                         # AdminTopBar, RFQDetailView, KnowledgeUploader, ProductForm
│   └── ui/                            # RFQForm, WhatsAppButton, CookieBanner
├── lib/
│   ├── constants.ts                   # Brand design tokens, navigation links, company info
│   ├── products.ts                    # 12 export products with technical specs and MOQs
│   ├── blog-data.ts                   # 5 B2B trade guides and procurement articles
│   ├── ai-types.ts                    # TypeScript types for chat, scores, emails, RAG
│   ├── ai-prompts.ts                  # Structured system prompts for Groq LLMs
│   ├── knowledge-base.ts              # RAG knowledge vectors with cosine similarity
│   ├── error-logger.ts                # Structured server-side error logging
│   ├── input-validator.ts             # Input sanitization and length checks
│   └── env.ts                         # Runtime environment variable validation
└── styles/
    └── globals.css                    # Tailwind directives, custom patterns, animations
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18.17+ or Node.js 20+
- npm or yarn

### 2. Installation
```bash
git clone <repository-url>
cd "KC IMPORT AND EXPORT"
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```bash
GROQ_API_KEY=gsk_your_groq_api_key_here
NEXT_PUBLIC_SITE_URL=https://www.kcimportexport.com
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Running Static Verification & Builds
```bash
# Verify TypeScript strict type-checking
npm run type-check

# Compile production build (verifies SSG for all 12 products and 5 articles)
npm run build

# Start production server
npm run start
```

---

## 🔐 Admin Dashboard

The admin console provides trade desk personnel with tools to monitor inquiries and audit AI knowledge:
- **URL**: `/admin/dashboard`
- **Modules**:
  - `/admin/leads` — Lead pipeline with AI intent scores and recommended action suggestions.
  - `/admin/rfqs` — Formal RFQ management with AI sales email draft generator.
  - `/admin/knowledge` — RAG vector auditor with live document Q&A verification.
  - `/admin/products` — Catalog inventory management.

---

## 📄 License
Commercial Proprietary Software — © KC Import and Export Private Limited. All Rights Reserved.
