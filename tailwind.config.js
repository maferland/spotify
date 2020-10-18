module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    enabled: !process.env.TAILWIND_DEV,
    content: ['./site/**/*.html'],
  },
  theme: {
    extend: {
      fontSize: {
        '6xl': '6rem',
      },
      fontFamily: {
        sans: ['Libre Baskerville', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [],
}
