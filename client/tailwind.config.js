/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kmuttColor: {
          500: "#FFB39F",
          800: "#FF8261",
        },
      },
    },
  },
  plugins: [],
};
