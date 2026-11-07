/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory:         "#F7F4EE",
        paper:         "#F0ECE3",
        "warm-white":  "#FAF8F4",
        charcoal:      "#2A2825",
        "charcoal-mid":"#4A4642",
        "charcoal-light": "#706C68",
        "muted-green": "#6B8C7A",
        "muted-green-light": "#8FAD9C",
        chartreuse:    "#C8E63A",
        "chartreuse-dark": "#A8C420",
        "border-subtle": "#DDD8CE",
        "border-mid":  "#C8C2B6",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [],
};
