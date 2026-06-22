/** @type {import('tailwindcss').Config} */

const config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        orange: {
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
        },
        green: {
          500: "#22c55e",
          600: "#16a34a",
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e40af 100%)',
      },
    },
  },
  plugins: [],
};

export default config;