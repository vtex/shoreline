import atImport from 'postcss-import'
import nano from 'cssnano'

export default {
  plugins: [atImport(), nano({ preset: 'default' })],
}
