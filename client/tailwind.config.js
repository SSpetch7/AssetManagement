/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        labtop: { max: '1414px' },
        // => @media (min-width: 640px and max-width: 767px) { ... }
        // md: { min: '768px', max: '1023px' },
        // // => @media (min-width: 768px and max-width: 1023px) { ... }
        // lg: { min: '1024px', max: '1279px' },
        // // => @media (min-width: 1024px and max-width: 1279px) { ... }
        // xl: { min: '1280px', max: '1535px' },
        // // => @media (min-width: 1280px and max-width: 1535px) { ... }
        // '2xl': { min: '1536px' },
      },
      fontSize: {
        14: '14px',
      },
      backgroundColor: {
        'main-bg': '#EFEFF0',
        'second-bg': '#FAFBFB',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      colors: {
        kmuttColor: {
          500: '#FFB39F',
          800: '#FF8261',
          'bg-menu': '#DCDCDC',
        },
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
    },
  },
  plugins: [],
};
