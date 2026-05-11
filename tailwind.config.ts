import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx,md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        brand: {
          50: "#eef9ff",
          100: "#d9f1ff",
          200: "#bce5ff",
          300: "#8dd3ff",
          400: "#56b8ff",
          500: "#2e98ff",
          600: "#1b78f2",
          700: "#1860dd",
          800: "#1a4fb2",
          900: "#1c468c",
          950: "#152b56",
        },
        ink: {
          50: "#f6f7f9",
          100: "#ebedf2",
          200: "#d3d8e1",
          300: "#aab3c4",
          400: "#7c889e",
          500: "#5b6884",
          600: "#46526b",
          700: "#3a4458",
          800: "#323a4a",
          900: "#1f2633",
          950: "#0e131c",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(15, 30, 60, 0.18)",
        glow: "0 0 0 1px rgba(46,152,255,0.4), 0 8px 30px -8px rgba(46,152,255,0.45)",
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(to right, rgba(15,30,60,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,30,60,0.06) 1px, transparent 1px)",
        "hero-radial":
          "radial-gradient(60% 60% at 50% 0%, rgba(46,152,255,0.18) 0%, rgba(46,152,255,0) 70%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
