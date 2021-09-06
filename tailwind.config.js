'use strict'

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      textColor: {
        'bluePrime': '#334257',
        'blueSub': '#476072',
        'baseColor': '#6b727b',
        'lightBlue': '#548CA8',
        'light': '#F9F9F9',
      },
      backgroundColor: {
        'lightBlue': '#548CA8',
        'light': '#F9F9F9',
        'dark': '#1A1A1D',
        'darkBody': '#18181b',
      },
      backgroundImage: (theme) => ({
        '404': "url('/404.svg')",
        '500': "url('/500.svg')",
      }),
      fontFamily: {
        body: ['SpoqaHanSansNeo'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
