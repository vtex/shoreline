import presetEnv from 'postcss-preset-env'

export default {
  plugins: [
    presetEnv({
      stage: 4,
      features: {
        'custom-media-queries': true,
        'system-ui-font-family': true,
        'nesting-rules': true,
      },
    }),
  ],
}
