// import presetEnv from 'postcss-preset-env'
import sass from '@csstools/postcss-sass'
import atImport from 'postcss-import'
import nano from 'cssnano'

export default {
  syntax: 'postcss-scss',
  plugins: [
    atImport(),
    sass(),
    nano({ preset: 'default' }),
    // presetEnv({
    //   features: {
    //     'custom-media-queries': true,
    //     'system-ui-font-family': true,
    //     'nesting-rules': true,
    //   },
    // }),
  ],
}
