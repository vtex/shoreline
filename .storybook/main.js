module.exports = {
  stories: ['../packages/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
      },
    },
    '@storybook/addon-a11y',
  ],
  typescript: {
    check: false,
    reactDocgen: false,
  },
  webpackFinal: async (config) => {
    let resultConfig = {
      ...config,
      parallelism: 1,
      module: {
        ...config.module,
        rules: [
          {
            test: /\.jsx?$/,
            use: {
              loader: require.resolve('babel-loader'),
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [
                  '@babel/plugin-proposal-object-rest-spread',
                  '@babel/plugin-proposal-optional-chaining',
                  '@babel/plugin-proposal-class-properties',
                ],
              },
            },
          },
          {
            test: /\.(ts|tsx)$/,
            use: {
              loader: require.resolve('babel-loader'),
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                ],
                plugins: [
                  '@babel/plugin-proposal-object-rest-spread',
                  '@babel/plugin-proposal-optional-chaining',
                  '@babel/plugin-proposal-class-properties',
                ],
              },
            },
          },
        ],
      },
    }

    if (resultConfig.mode === 'production') {
      // see https://github.com/storybooks/storybook/issues/1570
      resultConfig.plugins = resultConfig.plugins.filter(
        (plugin) => plugin.constructor.name !== 'UglifyJsPlugin'
      )
    }

    return resultConfig
  },
}
