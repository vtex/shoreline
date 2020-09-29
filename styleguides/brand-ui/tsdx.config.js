const url = require('@rollup/plugin-url')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')

module.exports = {
  rollup(config) {
    config.plugins = [
      url({ include: ['**/*.woff', '**/*.woff2'], limit: Infinity }),
      peerDepsExternal(),
      ...config.plugins,
    ]

    return config
  },
}
