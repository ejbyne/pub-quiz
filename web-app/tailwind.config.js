module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
          listStyleType: {
              alphabet: 'lower-latin'
          }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
  