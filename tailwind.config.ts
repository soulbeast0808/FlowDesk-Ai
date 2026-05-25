import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#05070d",
        obsidian: "#080c14",
        panel: "#0d1420",
        frost: "#edf7ff",
        slate: "#a6b5c6",
        cyanline: "#55e6ff",
        mint: "#6ef7b4",
        amber: "#f8bd57",
        rose: "#ff6f9d",
        violet: "#a78bfa"
      },
      boxShadow: {
        cyan: "0 0 70px rgba(85, 230, 255, 0.18)",
        mint: "0 0 60px rgba(110, 247, 180, 0.14)",
        rose: "0 0 60px rgba(255, 111, 157, 0.13)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif"
        ]
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-110%)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateY(520%)", opacity: "0" }
        },
        glow: {
          "0%, 100%": { opacity: "0.52" },
          "50%": { opacity: "1" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      animation: {
        scan: "scan 5s ease-in-out infinite",
        glow: "glow 3.5s ease-in-out infinite",
        float: "float 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
