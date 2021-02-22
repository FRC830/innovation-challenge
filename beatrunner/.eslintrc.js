const path = require('path')

module.exports = {
  // root: true,
  extends: '@react-native-community',
  rules: {
    semi: 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['_assets', path.resolve(__dirname, 'src/assets')],
          ['_components', path.resolve(__dirname, 'src/components')],
          ['_screens', path.resolve(__dirname, 'src/screens')],
          ['_utils', path.resolve(__dirname, 'src/utils')],
          ['_redux', path.resolve(__dirname, 'src/redux')],
        ],
        extensions: ['.js'],
      },
    },
  },
}
