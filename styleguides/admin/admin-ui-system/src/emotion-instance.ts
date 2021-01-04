import createEmotion from '@emotion/css/create-instance'

export const {
  flush,
  hydrate,
  cx,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache,
} = createEmotion({
  key: 'vtex-admin-ui',
})
