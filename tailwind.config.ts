import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "var(--brand-primary, #1B3A6B)",
          "navy-dark": "#12284b",
          "navy-light": "#254e8e",
          amber: "var(--brand-accent, #F5A623)",
          "amber-hover": "#e09315",
          "amber-light": "#fef7eb",
          bg: "var(--brand-bg, #F8F9FA)",
          text: "var(--brand-text, #1A1A1A)",
          muted: "#6B7280",
          border: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        heading: ["var(--font-playfair)", "serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px rgba(27, 58, 107, 0.07)",
        "card-hover": "0 10px 30px rgba(27, 58, 107, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
