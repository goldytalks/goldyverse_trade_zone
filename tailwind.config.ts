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
        background: "#0f0f0f",
        card: "#1a1a1a",
        border: "#2a2a2a",
        green: "#4ade80",
        red: "#f87171",
        blue: "#60a5fa",
        muted: "#6b7280",
      },
    },
  },
  plugins: [],
};

export default config;
