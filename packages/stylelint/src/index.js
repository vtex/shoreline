'use strict'

const textPlugin = require('./plugins/no-text-property')
const spacePlugin = require('./plugins/no-space-in-px')

const colorRules = {
  'color-no-invalid-hex': [
    true,
    {
      message: 'Please use a Shoreline color token instead of %s',
    },
  ],
}

const typographyRules = {
  'shoreline/no-text-property': true,
}

const spaceRules = {
  'shoreline/no-space-in-px': true,
}

module.exports = {
  plugins: [textPlugin, spacePlugin],
  reportDescriptionlessDisables: true,
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  rules: { ...colorRules, ...typographyRules, ...spaceRules },
}
