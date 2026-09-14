import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "KC Import and Export Private Limited — Rajkot, Gujarat, India";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #12284b 0%, #1B3A6B 50%, #0c1c36 100%)",
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
        {/* Top Header Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              background: "#F5A623",
              color: "#1B3A6B",
              fontWeight: 800,
              fontSize: "20px",
              padding: "10px 24px",
              borderRadius: "8px",
              letterSpacing: "1px",
            }}
          >
            KC IMPORT &amp; EXPORT PVT. LTD.
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#94a3b8",
              fontWeight: 500,
            }}
          >
            Rajkot, Gujarat, India
          </div>
        </div>

        {/* Center Main Punchline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#ffffff",
              maxWidth: "1000px",
            }}
          >
            Your Reliable India-Based B2B Export Partner
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#cbd5e1",
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            Spices &amp; Agricultural Commodities • Precision Brass Inserts • Industrial Hardware • Cotton Textiles
          </div>
        </div>

        {/* Bottom Trust Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", gap: "32px", fontSize: "18px", color: "#e2e8f0" }}>
            <span>✓ IEC &amp; APEDA Registered</span>
            <span>✓ FOB / CIF Incoterms 2020</span>
            <span>✓ Mundra, Kandla &amp; Pipavav Ports</span>
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#F5A623",
              fontWeight: 700,
            }}
          >
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
