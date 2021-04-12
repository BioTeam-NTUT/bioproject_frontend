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
        '20': '5rem'
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
