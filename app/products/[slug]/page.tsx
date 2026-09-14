import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/lib/products";
import ProductDetail from "@/components/products/ProductDetail";
import { COMPANY_NAME } from "@/lib/constants";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Generate static routes for all 12 products at build time
export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

// Generate unique dynamic SEO metadata for each product
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found | KC Import Export",
      description: "The requested export product could not be located.",
    };
  }

  const title = `${product.name} | Export from India | KC Import Export`;
  const description = `${product.shortDescription} Minimum order volume: ${product.moq}. Exporting from Rajkot, Gujarat, India.`;
  const canonicalUrl = `https://kcimportexport.com/products/${params.slug}`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.category,
      product.subcategory,
      product.sku,
      product.material,
      "India Export",
      "B2B Supplier Gujarat",
      "Rajkot manufacturer",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "KC Import and Export Private Limited",
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: `/products/${params.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@kcimportexport",
    },
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.shortDescription,
    "sku": product.sku,
    "category": product.category,
    "material": product.material,
    "brand": {
      "@type": "Brand",
      "name": COMPANY_NAME,
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "description": `Export minimum order quantity: ${product.moq}. FOB/CIF pricing upon RFQ submission.`,
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://kcimportexport.com" },
          { name: "Products", url: "https://kcimportexport.com/products" },
          {
            name: product.name,
            url: `https://kcimportexport.com/products/${params.slug}`,
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />
    </>
  );
}
