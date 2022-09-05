import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import external from 'rollup-plugin-peer-deps-external'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const packageJson = require('./package.json')

const production = !process.env.ROLLUP_WATCH

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
      },
      {
        file: packageJson.module,
        format: 'esm',
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        compact: true,
        configFile: '../../babel.config.js',
      }),
      production && terser(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'src/index.ts',
    output: [{ file: packageJson.types, format: 'esm' }],
    plugins: [dts()],
  },
]
