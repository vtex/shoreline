module.exports = {
  extends: ['stylelint-config-recommended', '@vtex/shoreline-stylelint'],
  plugins: ['stylelint-prettier'],
  files: ['**/*.css'],
  reportDescriptionlessDisables: true,
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  rules: {},
}
