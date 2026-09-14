import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Share2,
  BookOpen,
  MessageCircle,
} from "lucide-react";

import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import BlogImage from "@/components/blog/BlogImage";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Article Not Found | KC Import Export",
    };
  }

  const title = `${post.title} | KC Import Export Trade Guides`;
  const canonicalUrl = `https://kcimportexport.com/blog/${params.slug}`;

  return {
    title,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description: post.excerpt,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.coverImage || "/opengraph-image",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@kcimportexport",
    },
  };
}

function formatInlineMarkdown(text: string): string {
  // Convert [text](url) to anchor link
  let formatted = text.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" class="text-[#1B3A6B] font-semibold underline underline-offset-4 hover:text-[#F5A623] transition">$1</a>'
  );
  // Convert **bold** to <strong>
  formatted = formatted.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-bold text-gray-900">$1</strong>'
  );
  // Convert `code` to <code>
  formatted = formatted.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 rounded bg-gray-100 font-mono text-xs text-[#1B3A6B]">$1</code>'
  );
  return formatted;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "KC Import and Export",
    },
    "publisher": {
      "@type": "Organization",
      "name": "KC Import and Export",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kcimportexport.com/opengraph-image",
      },
    },
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-10 sm:py-16">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://kcimportexport.com" },
          { name: "Blog", url: "https://kcimportexport.com/blog" },
          {
            name: post.title,
            url: `https://kcimportexport.com/blog/${params.slug}`,
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#1B3A6B] transition mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>

          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#1B3A6B] text-xs font-bold uppercase tracking-wider border border-blue-200">
              {post.category}
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 font-serif leading-tight">
              {post.title}
            </h1>

            {/* Author & Date Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-2 border-b border-gray-200 pb-6">
              <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                <User className="w-4 h-4 text-[#F5A623]" />
                <span>{post.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{post.publishedAt}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative overflow-hidden aspect-video rounded-3xl shadow-subtle border border-gray-200">
          {/* Gemini prompt comments for blog covers:
              // Post 1: "Overhead flat lay of Indian agricultural export products — burlap sacks of cumin, turmeric, and coriander on wooden dock beside shipping manifests and APEDA certificate papers. Professional trade photography, warm natural light."
              // Post 2: "Close-up of official HS code tariff classification booklet open on a desk beside CNC brass machined parts, stainless flanges, and a digital vernier caliper. Clean industrial trade photography."
              // Post 3: "Aerial drone view of Mundra Port Gujarat at golden hour — rows of coloured shipping containers, cranes, and a cargo vessel departing. Professional commercial logistics photography."
              // Post 4: "Flat lay of B2B export documentation spread on white desk — Bill of Lading, Packing List, Certificate of Origin, Phytosanitary Certificate, and Commercial Invoice with a pen and stamp. Clean professional photography."
              // Post 5: "Stacked cargo pallets in a modern GIDC warehouse with MOQ labels, barcodes, and a logistics manager reviewing a shipping order on a tablet. Bright industrial lighting."
          */}
          <BlogImage
            src={post.coverImage}
            alt={post.title}
            category={post.category}
            priority
          />
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-gray-200/90 shadow-subtle text-gray-800 leading-relaxed space-y-6 text-sm sm:text-base font-sans">
          {post.content.split("\n\n").map((paragraph, idx) => {
            const trimmed = paragraph.trim();

            if (trimmed.startsWith("### ")) {
              return (
                <h3
                  key={idx}
                  className="text-xl sm:text-2xl font-bold text-gray-900 font-serif pt-4 pb-1 border-b border-gray-100"
                >
                  {trimmed.replace("### ", "")}
                </h3>
              );
            }

            if (trimmed.startsWith("#### ")) {
              return (
                <h4
                  key={idx}
                  className="text-base sm:text-lg font-bold text-[#1B3A6B] font-serif pt-2"
                >
                  {trimmed.replace("#### ", "")}
                </h4>
              );
            }

            if (trimmed.startsWith("- ")) {
              const bullets = trimmed.split("\n").map((b) => b.replace("- ", ""));
              return (
                <ul key={idx} className="space-y-2 pl-2">
                  {bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-[#F5A623] font-bold mt-1">•</span>
                      <span
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: formatInlineMarkdown(b),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              );
            }

            if (trimmed.startsWith("|")) {
              return (
                <div key={idx} className="overflow-x-auto py-2">
                  <pre className="text-xs bg-gray-50 p-4 rounded-xl border border-gray-200 font-mono text-gray-800">
                    {trimmed}
                  </pre>
                </div>
              );
            }

            return (
              <p
                key={idx}
                className="leading-relaxed text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: formatInlineMarkdown(trimmed),
                }}
              />
            );
          })}
        </div>

        {/* Trade CTA Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1B3A6B] to-[#142b50] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold font-serif text-white">
              Planning an Import Shipment from India?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 max-w-lg">
              Our Rajkot commercial team provides formal Proforma Invoices,
              certified test reports, and FOB/CIF freight logistics within 24 hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-[#F5A623] hover:bg-amber-500 text-gray-950 font-bold text-xs sm:text-sm shadow-md transition shrink-0 inline-flex items-center gap-2"
          >
            <span>Request Commercial Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related Articles Row */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 font-serif">
              Related Trade Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition shadow-subtle space-y-2 group block"
                >
                  <span className="text-[10px] uppercase font-bold text-[#1B3A6B]">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#1B3A6B] transition line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
