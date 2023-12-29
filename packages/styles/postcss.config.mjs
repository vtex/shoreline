import sass from '@csstools/postcss-sass'
import atImport from 'postcss-import'
import nano from 'cssnano'

export default {
  syntax: 'postcss-scss',
  plugins: [atImport(), sass(), nano({ preset: 'default' })],
}
