import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'
import del from 'rollup-plugin-delete'
import json from '@rollup/plugin-json'

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
        assetFileNames({ name }) {
          if (!name) return ''

          return name.replace(/^src\//, '')
        },
      },
      {
        file: packageJson.module,
        format: 'esm',
        assetFileNames({ name }) {
          if (!name) return ''

          return name.replace(/^src\//, '')
        },
      },
    ],
    plugins: [
      resolve({ moduleDirectories: ['ariakit', 'reakit'] }),
      commonjs(),
      json(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        compact: true,
        configFile: '../../babel.config.js',
      }),
      production && terser(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
      }),
      postcss({
        plugins: [],
        extensions: ['.css', '.scss'],
        extract: true,
      }),
      vanillaExtractPlugin(),
    ],
    external: Object.keys({
      ...packageJson.dependencies,
      ...packageJson.peerDependencies,
    }),
  },
  {
    input: 'dist/declarations/index.d.ts',
    output: [{ file: packageJson.types, format: 'esm' }],
    plugins: [dts(), del({ hook: 'buildEnd', targets: './dist/declarations' })],
    external: [/\.css$/u, /\.scss$/u],
  },
]
