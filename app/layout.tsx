import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import PublicShell from "@/components/layout/PublicShell";
import { COMPANY_NAME, COMPANY_TAGLINE } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY_NAME} | ${COMPANY_TAGLINE}`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description:
    "Leading B2B international import and export company based in Rajkot, Gujarat, India. Verified sourcing, pre-shipment quality inspection, export documentation, and container shipping worldwide.",
  keywords: [
    "KC Import and Export",
    "Rajkot Gujarat Exporters",
    "Indian B2B Export Company",
    "Agricultural Products Exporter India",
    "Precision Brass Components Rajkot",
    "Gujarat Textile Exporter",
    "Ceramic Tiles Morbi Export",
    "Container Shipping Mundra Kandla",
  ],
  authors: [{ name: COMPANY_NAME }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kcimportexport.com"),
  alternates: {
    canonical: "https://kcimportexport.com",
    languages: {
      en: "https://kcimportexport.com",
      "x-default": "https://kcimportexport.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KC Import and Export Private Limited",
    title: `${COMPANY_NAME} | Premier Indian B2B Export House`,
    description:
      "Reliable export conduit connecting global buyers with certified Indian manufacturing and agricultural products from Rajkot, Gujarat.",
    url: "https://kcimportexport.com",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kcimportexport",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#1B3A6B",
  width: "device-width",
  initialScale: 1,
};

import { validateEnv } from "@/lib/env";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  validateEnv();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="alternate" hrefLang="en" href="https://kcimportexport.com" />
        <link rel="alternate" hrefLang="x-default" href="https://kcimportexport.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body suppressHydrationWarning className="bg-[#F8F9FA] text-[#1A1A1A] font-sans antialiased min-h-screen flex flex-col selection:bg-[#F5A623]/30 selection:text-[#1B3A6B]">
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
