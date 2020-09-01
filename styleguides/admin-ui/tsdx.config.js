const url = require('@rollup/plugin-url')

module.exports = {
  rollup(config) {
    config.plugins = [
      url({ include: ['**/*.woff', '**/*.woff2'] }),
      ...config.plugins,
    ]

    return config
  },
}
