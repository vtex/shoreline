/* eslint-disable no-console */
console.log()
module.exports = {
  components: './playroom/components.ts',
  outputPath: './storybook-static/playroom',
  openBrowser: false,
  widths: [1024],
  frameComponent: './src/theme/Provider.tsx',
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          include: __dirname,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
              plugins: [
                require.resolve('@babel/plugin-proposal-class-properties'),
                require.resolve('babel-plugin-typescript-to-proptypes'),
              ],
            },
          },
        },
        {
          include: /src/,
          exclude: /node_modules/,
          test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
          use: { loader: 'url-loader?limit=100000' },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
  }),
}
