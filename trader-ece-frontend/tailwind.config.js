/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#18E0D0",
        darkBg: "#0F1419",
        darkSoft: "#1B2229",
        textMuted: "#A0A7AF",
      },
      boxShadow: {
        glow: "0 0 20px rgba(24,224,208,0.4)",
      },
    },
  },
  plugins: [],
};