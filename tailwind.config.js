module.exports = {
  purge: [
    './src/**/*.tsx',
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        '20': '5rem'
      },
      minWidth: {
        '20': '5rem',
        '24': '6rem',
        '1/2': '50%',
        '2/3': '66.666667%',
        '3/4': '75%'
      },
      animation: {
        'spin-low': 'spin 20s linear infinite'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
