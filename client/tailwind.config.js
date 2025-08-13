/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d8edff',
          200: '#b9dfff',
          300: '#89cbff',
          400: '#58b1ff',
          500: '#2d91ff',
          600: '#1672f2',
          700: '#115bd0',
          800: '#124aa5',
          900: '#143f84'
        }
      }
    },
  },
  plugins: [],
}


