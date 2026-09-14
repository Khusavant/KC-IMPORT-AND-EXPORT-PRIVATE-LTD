import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Calendar, Clock, ArrowRight, BookOpen, Tag, ArrowUpRight } from "lucide-react";

import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import BlogImage from "@/components/blog/BlogImage";
import { StaggerList, StaggerItem } from "@/components/animations/StaggerList";
import SmoothLink from "@/components/animations/SmoothLink";

export const metadata: Metadata = {
  title: "B2B Export Insights & Trade Guides | KC Import Export",
  description:
    "Authoritative guides, HS code classifications, and international procurement best practices for importing commodities and engineered goods from Gujarat, India.",
  keywords:
    "import export trade guides, india export blog, hs code guide, apeda compliance, mundra port logistics",
  alternates: { canonical: "https://kcimportexport.com/blog" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KC Import and Export Private Limited",
    title: "B2B Export Insights & Trade Guides | KC Import Export",
    description:
      "Expert B2B export insights, compliance checklists, and supply chain strategies from Rajkot, Gujarat.",
    url: "https://kcimportexport.com/blog",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kcimportexport",
  },
};

export default function BlogListingPage() {
  const featuredPost = BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.slice(1);

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-12 sm:py-16">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://kcimportexport.com" },
          { name: "Blog", url: "https://kcimportexport.com/blog" },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1B3A6B] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>Export Knowledge & Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 font-serif tracking-tight">
            International Trade Insights & Procurement Guides
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Direct expertise from our Rajkot export desks on quality standards,
            customs compliance, HS codes, and maritime shipping logistics from India.
          </p>
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-subtle overflow-hidden hover:shadow-card transition duration-300 grid grid-cols-1 lg:grid-cols-12 group">
            <div className="lg:col-span-6 relative overflow-hidden aspect-video lg:aspect-auto lg:min-h-full bg-gray-100">
              {/* Gemini: "Overhead flat lay of Indian agricultural export products — burlap sacks of cumin, turmeric, and coriander on wooden dock beside shipping manifests and APEDA certificate papers. Professional trade photography, warm natural light." */}
              <BlogImage
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                category={featuredPost.category}
                priority
                className="group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#1B3A6B] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-10">
                Featured Guide
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="font-semibold text-[#1B3A6B]">
                    {featuredPost.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {featuredPost.readTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {featuredPost.publishedAt}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-serif group-hover:text-[#1B3A6B] transition leading-tight">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {featuredPost.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <SmoothLink
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#1B3A6B] hover:text-[#F5A623] transition group-hover:translate-x-1 duration-200"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </SmoothLink>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <StaggerItem key={post.slug} className="h-full">
              <article
                className="bg-white rounded-2xl border border-gray-200/90 shadow-subtle overflow-hidden hover:shadow-card transition duration-300 flex flex-col justify-between group h-full"
              >
                <div className="relative overflow-hidden aspect-video bg-gray-100">
                  {/* Gemini: "Close-up of official HS code tariff classification booklet open on a desk beside CNC brass machined parts, stainless flanges, and a digital vernier caliper. Clean industrial trade photography." */}
                  {/* Gemini: "Aerial drone view of Mundra Port Gujarat at golden hour — rows of coloured shipping containers, cranes, and a cargo vessel departing. Professional commercial logistics photography." */}
                  {/* Gemini: "Flat lay of B2B export documentation spread on white desk — Bill of Lading, Packing List, Certificate of Origin, Phytosanitary Certificate, and Commercial Invoice with a pen and stamp. Clean professional photography." */}
                  {/* Gemini: "Stacked cargo pallets in a modern GIDC warehouse with MOQ labels, barcodes, and a logistics manager reviewing a shipping order on a tablet. Bright industrial lighting." */}
                  <BlogImage
                    src={post.coverImage}
                    alt={post.title}
                    category={post.category}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#1B3A6B] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs z-10">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.publishedAt}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 font-serif leading-snug group-hover:text-[#1B3A6B] transition line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <SmoothLink
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1B3A6B] hover:text-[#F5A623] transition"
                    >
                      <span>Read</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </SmoothLink>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </div>
  );
}
