'use strict'

const textPlugin = require('./plugins/no-text-property')
const spacePlugin = require('./plugins/no-px-values')

module.exports = {
  plugins: [textPlugin, spacePlugin],
  reportDescriptionlessDisables: true,
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  rules: { 'shoreline/no-text-property': true, 'shoreline/no-px-values': true },
}
