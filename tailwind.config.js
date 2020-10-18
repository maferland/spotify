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
    extend: {},
  },
  variants: {},
  plugins: [],
}
