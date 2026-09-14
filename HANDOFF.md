# KC Import and Export Private Limited — Project Handoff Notes

> **Production-Ready Next.js 14 B2B Export Portal & AI Sales Platform**  
> Built across 5 comprehensive phases for KC Import and Export Private Limited (Rajkot, Gujarat, India).

---

## 📦 What is Built

1. **Full B2B Public Website**:
   - Homepage (`/`) with Hero, Category Showcase, Company Snapshot, Why KC trust pillars, 8-Step Export Process, and Final CTA.
   - About Us (`/about`), Contact & RFQ Desk (`/contact`), Dedicated Industries (`/industries`), Dedicated Why KC (`/why-kc`), and Interactive 8-Step Export Process (`/export-process`).
2. **12 Static Product Pages (`/products/[slug]`)**:
   - Complete technical specifications, MOQs, HS codes, packaging details, Sortex/IS/ASTM standards.
   - Dynamic OpenGraph cards generated via `next/og`.
   - Structured Data (`Product` & `AggregateOffer` JSON-LD schemas).
3. **RFQ Inquiry System**:
   - Multi-step modal and standalone form with file/drawing upload attachments and commercial parameters (Incoterms, volume, destination port).
4. **AI Sales Assistant (Groq RAG)**:
   - Powered by `llama-3.3-70b-versatile` & `openai/gpt-oss-120b` with multi-model fallback.
   - Retrieval-Augmented Generation (RAG) using cosine similarity over local Gujarat export knowledge vectors.
   - Multilingual real-time detection and response (English, Hindi, Gujarati, Arabic) with active status badges.
   - Commercial lead scoring with concrete signals extraction and strategic follow-up recommendations.
5. **Full Enterprise Admin Dashboard (`/admin`)**:
   - Admin login & session simulation.
   - Leads pipeline management with AI qualification.
   - Formal RFQ manager with automated AI B2B Sales Email draft generator.
   - Product catalog inventory management.
   - Knowledge base auditor with live Document Q&A testing.
   - Analytics, Trade Certificates, Blog Manager, Users, and Settings.
6. **SEO Trade Blog (`/blog`)**:
   - 5 comprehensive B2B guides targeting high-intent international buyer queries.
   - Category filtering, search, tags, reading time, and related article links.
7. **Production Hardening & Compliance**:
   - Dynamic XML Sitemap (`app/sitemap.ts`) & `robots.txt` (`app/robots.ts`).
   - Edge rate limiting middleware (30 reqs/min per IP) on `/api/*`.
   - Strict security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Permissions-Policy`).
   - Skeleton loading states for products and blog articles.
   - Branded 404 (`not-found.tsx`) and Error Boundary (`error.tsx`).
   - GDPR/ePrivacy compliant Cookie Consent banner with `localStorage` persistence.
   - Verified 84 static pages, 0 TypeScript errors, 0 ESLint warnings.

---

## ⚡ Quickstart Guide (Before You Run)

### Step 1 — Create `.env.local`
In the project root, ensure `.env.local` exists:
```env
GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_SITE_URL=https://www.kcimportexport.com
```
> Get your free Groq API key at [https://console.groq.com](https://console.groq.com) (no credit card required).

### Step 2 — Install Dependencies & Start
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 3 — Admin Portal Access
- **URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email**: `admin@kc.com`
- **Password**: `admin123`

---

## 📋 Pre-Launch Checklist (Replacing Placeholder Data)

All placeholder values are labeled with `// TODO: replace with real data`:

- [ ] **Company Info (`lib/constants.ts`)**:
  - Update official company name, registered address, phone numbers, export desk email, and official WhatsApp link.
- [ ] **Product Catalog (`lib/products.ts`)**:
  - Review all 12 products, adjust SKUs, HS codes, MOQs, and technical specifications to match real factory stock.
- [ ] **RAG Knowledge Base (`lib/knowledge-base.ts`)**:
  - Replace knowledge chunks with actual company background, warehouse certifications, and customs bank details.
- [ ] **Product Photography (`public/images/products/`)**:
  - Replace generated/placeholder images with high-resolution factory and cargo photos (prompt comments are documented in the code).
- [ ] **Certifications (`/admin/certificates`)**:
  - Upload authentic APEDA, Spices Board, ISO 9001, FSSAI, and CE certificates.
- [ ] **Statistics (`components/home/CompanySnapshot.tsx`)**:
  - Finalize any `[TO BE CONFIRMED]` export volume and metrics figures.
- [ ] **Legal (`app/privacy/page.tsx` & `app/terms/page.tsx`)**:
  - Review bank payment clauses and jurisdiction with KC's legal counsel.

---

## 🚀 Deployment to Vercel (Recommended)

1. Install Vercel CLI (or connect via GitHub in the Vercel Web Dashboard):
   ```bash
   npm install -g vercel
   vercel
   ```
2. In the Vercel Dashboard:
   - Navigate to: **Project Settings** → **Environment Variables**
   - Add:
     - `GROQ_API_KEY` = `gsk_...`
     - `NEXT_PUBLIC_SITE_URL` = `https://your-custom-domain.com`
3. Trigger production deployment:
   ```bash
   vercel --prod
   ```

---

## 💻 Tech Stack Summary

- **Core**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + CSS Custom Properties
- **UI Components**: shadcn/ui patterns + Lucide React (100% vector icons, zero OS emojis)
- **AI / LLM**: Groq SDK (`llama-3.3-70b-versatile`, `openai/gpt-oss-120b`, `qwen/qwen3.8-27b`)
- **Typography & Media**: `next/font` (Inter & Playfair Display), `next/image`, `next/og`
