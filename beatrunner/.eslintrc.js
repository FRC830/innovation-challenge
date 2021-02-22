module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    semi: 0,
  },
  plugins: ['import'], // sudo npm install eslint-plugin-import --global
  settings: {
    'import/resolver': {
      alias: {
        map: [['_', './src']],
        extensions: ['.js'],
      },
    },
  },
}
