import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsCatalogClient from "./ProductsCatalogClient";
import { PRODUCTS } from "@/lib/products";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Product Catalog | Export-Grade B2B Products from India | KC Import Export",
  description:
    "Explore KC Import and Export's comprehensive B2B export catalog. Agricultural spices, industrial brass hardware, textiles, and ceramics from Gujarat.",
  keywords:
    "export product catalog india, b2b products gujarat, rajkot brass parts export, cumin seeds exporter, cotton yarn supplier india",
  alternates: { canonical: "https://kcimportexport.com/products" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KC Import and Export Private Limited",
    title: "Product Catalog | Export-Grade B2B Products from India | KC Import Export",
    description:
      "Explore KC Import and Export's comprehensive B2B export catalog. Sourced directly from Gujarat industrial manufacturing clusters and certified agricultural farms.",
    url: "https://kcimportexport.com/products",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kcimportexport",
  },
};

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://kcimportexport.com" },
          { name: "Products", url: "https://kcimportexport.com/products" },
        ]}
      />
      <Suspense fallback={<div className="min-h-screen bg-gray-50 animate-pulse" />}>
        <ProductsCatalogClient initialProducts={PRODUCTS} />
      </Suspense>
    </>
  );
}
