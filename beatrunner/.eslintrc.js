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
          ['_assets', 'src/assets'],
          ['_components', 'src/components'],
          ['_screens', 'src/screens'],
          ['_utils', 'src/utils'],
          ['_redux', 'src/redux'],
        ],
        extensions: ['.js'],
      },
    },
  },
}
