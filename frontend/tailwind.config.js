/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // scans all your React files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",   // nice modern indigo
        secondary: "#22c55e", // green
      },
    },
  },
  plugins: [],
};