export default {
  plugins: {
    'postcss-import': {},
    'postcss-nesting': {},
    '@tailwindcss/postcss': {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      'cssnano': {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          minifyFontValues: true,
          minifyGradients: true,
          minifySelectors: true,
          mergeLonghand: true,
          mergeRules: true,
          cssDeclarationSorter: { order: 'smacss' }
        }]
      }
    } : {})
  }
}
