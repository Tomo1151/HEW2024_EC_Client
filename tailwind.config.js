/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "0px",
      sm: "650px",
      md: "960px",
      lg: "1280px",
      xl: "1920px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "main-theme": "var(--colors-main-theme)",
        "sub-theme": "var(--colors-sub-theme)",
      },
      height: {
        header: "var(--height-header)",
      },
    },
  },
  plugins: [],
  important: true,
};
