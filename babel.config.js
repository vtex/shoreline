const BABEL_ENV = process.env.BABEL_ENV
const cjs = BABEL_ENV !== undefined && BABEL_ENV === 'cjs'

module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        modules: cjs ? 'commonjs' : false,
        loose: true,
      },
    ],
  ],
}
