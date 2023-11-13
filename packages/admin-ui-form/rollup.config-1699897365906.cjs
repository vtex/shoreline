'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var resolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');
var typescript = require('@rollup/plugin-typescript');
var babel = require('@rollup/plugin-babel');
var rollupPluginTerser = require('rollup-plugin-terser');
var dts = require('rollup-plugin-dts');
var del = require('rollup-plugin-delete');
var json = require('@rollup/plugin-json');

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const packageJson = require('./package.json');

const production = !process.env.ROLLUP_WATCH;

var rollupConfig = [
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
      resolve({ moduleDirectories: ['ariakit', 'reakit'] }),
      commonjs(),
      json(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        compact: true,
        configFile: '../../babel.config.js',
      }),
      production && rollupPluginTerser.terser(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
      }),
    ],
    external: Object.keys({
      ...packageJson.dependencies,
      ...packageJson.peerDependencies,
    }),
  },
  {
    input: 'dist/declarations/index.d.ts',
    output: [{ file: packageJson.types, format: 'esm' }],
    plugins: [
      dts.default(),
      del({ hook: 'buildEnd', targets: './dist/declarations' }),
    ],
  },
];

exports.default = rollupConfig;
