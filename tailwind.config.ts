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
        background: "#0a0a0b",
        surface: "#141415",
        border: "#1f1f22",
        "text-primary": "#ededec",
        "text-secondary": "#8a8a8a",
        accent: "#2dd4bf",
        "ai-glow": "#a78bfa",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "hero": ["4rem", { lineHeight: "1.1", fontWeight: "700" }],
        "hero-sm": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
      },
      spacing: {
        "section": "5rem",
      },
      animation: {
        "pulse-slow": "pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "cursor-blink": "blink 1s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      boxShadow: {
        "card": "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)",
        "card-hover": "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
        "ai-glow": "0 0 20px rgba(167, 139, 250, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
