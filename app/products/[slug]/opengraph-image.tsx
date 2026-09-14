import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/lib/products";

export const runtime = "edge";
export const alt = "KC Import and Export — Product Specifications";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  const productName = product?.name || "B2B Export Product";
  const category = product?.category || "Industrial & Agricultural Export";
  const sku = product?.sku || "KC-EXP-001";
  const moq = product?.moq || "Inquire for MOQ";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #12284b 0%, #1B3A6B 60%, #0a172b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "60px 80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Badges */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div
            style={{
              background: "#F5A623",
              color: "#1B3A6B",
              fontWeight: 800,
              fontSize: "18px",
              padding: "8px 20px",
              borderRadius: "6px",
            }}
          >
            {category.toUpperCase()}
          </div>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#e2e8f0",
              fontWeight: 600,
              fontSize: "16px",
              padding: "8px 18px",
              borderRadius: "6px",
            }}
          >
            SKU: {sku}
          </div>
        </div>

        {/* Center Product Title & MOQ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "1050px" }}>
          <div
            style={{
              fontSize: "52px",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#ffffff",
            }}
          >
            {productName}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#F5A623",
              fontWeight: 600,
            }}
          >
            Export MOQ: {moq} • FOB Mundra / Kandla Port
          </div>
        </div>

        {/* Bottom Company Branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#cbd5e1" }}>
            KC IMPORT AND EXPORT PRIVATE LIMITED • RAJKOT, GUJARAT
          </div>
          <div style={{ fontSize: "18px", color: "#94a3b8" }}>
            www.kcimportexport.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
