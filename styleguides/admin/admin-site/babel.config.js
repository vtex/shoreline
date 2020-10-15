module.exports = {
  presets: [
    [
      'babel-preset-gatsby',
      {
        targets: {
          browsers: ['>0.25%', 'not dead'],
        },
      },
    ],
  ],
  plugins: ['emotion', 'babel-plugin-extract-react-types'],
}
