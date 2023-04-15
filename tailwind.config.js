/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'Poppins'
      }
    },
    colors: {
      'blue': '#377DFF',
      'dark-blue': '#212833',
      'black': '#191C21',
      'white': '#EEEFF2',
      'gray': '#848C9B',
      'dark-gray': '#4E5D78',
      'red': '#EA5230'
    }
  },
  plugins: [],
}
