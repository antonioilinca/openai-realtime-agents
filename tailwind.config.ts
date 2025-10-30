import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A73E1",
        secondary: "#1A1A1A",
        accent: "#D4AF37",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        muted: "#9AA4B2",
        surface: "#111318",
        background: "#0B0D10",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        xl: "1.2rem",
      },
      boxShadow: {
        lexora: "0 10px 30px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
