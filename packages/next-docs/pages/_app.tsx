import React from 'react'
import type { AppProps } from 'next/app'
import '@vtex/shoreline-tokens/styles'
import '@vtex/shoreline-styles/no-layer'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
