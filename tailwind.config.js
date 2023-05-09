/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '420px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'lg+' : '1120px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        giga: ['var(--font-lexend-giga)'],
        IBM: ['var(--font-IBM)'],
        roboto: ['var(--font-roboto)'],
        raleway: ['var(--font-raleway)'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
