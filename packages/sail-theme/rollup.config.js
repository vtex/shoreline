import postcss from 'rollup-plugin-postcss'

export default [
  {
    input: 'src/index.scss',
    output: [
      {
        file: 'dist/theme.css',
      },
    ],
    plugins: [
      postcss({
        plugins: [],
        extensions: ['.css', '.scss'],
        extract: true,
      }),
    ],
  },
]
