import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        institution: "#003366",
        gold: "#d4af37",
        stone: "#f2f2f2",
      },
      boxShadow: {
        soft: "0 20px 40px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
