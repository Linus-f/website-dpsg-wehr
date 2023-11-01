/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '360px',
      's': '560px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      "2xl": "1536px",
    }
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: 'class',
}

