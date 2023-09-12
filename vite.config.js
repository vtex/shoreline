import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default {
  plugins: [vanillaExtractPlugin()],
  server: {
    hmr: {
      overlay: false,
    },
  },
}
