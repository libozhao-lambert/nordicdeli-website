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
        cream: {
          50: "#fdfaf4",
          100: "#faf4e6",
          200: "#f5ead4",
          DEFAULT: "#F5F0E8",
        },
        birch: {
          200: "#f0d8a8",
          400: "#D4A96A",
          600: "#B8894A",
          800: "#8a6035",
          DEFAULT: "#D4A96A",
        },
        forest: {
          50: "#f0f5f0",
          100: "#d6e8d6",
          400: "#5a8a5a",
          600: "#3D6B3D",
          800: "#1F4A1F",
          DEFAULT: "#3D6B3D",
        },
        charcoal: {
          600: "#3d3d3d",
          700: "#2D2D2D",
          800: "#1A1A1A",
          900: "#0d0d0d",
        },
        mist: {
          DEFAULT: "#E8DDD0",
          dark: "#d4c4b0",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "4.5rem",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "3.5rem",
          { lineHeight: "1.1", letterSpacing: "-0.015em" },
        ],
        "display-md": [
          "2.5rem",
          { lineHeight: "1.15", letterSpacing: "-0.01em" },
        ],
        "display-sm": [
          "1.875rem",
          { lineHeight: "1.2", letterSpacing: "-0.005em" },
        ],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        hygge: "0 4px 24px 0 rgba(45,45,45,0.08)",
        "hygge-lg": "0 8px 48px 0 rgba(45,45,45,0.12)",
        "hygge-sm": "0 2px 12px 0 rgba(45,45,45,0.06)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
