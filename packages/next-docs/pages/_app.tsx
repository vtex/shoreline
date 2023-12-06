import React from 'react'
import type { AppProps } from 'next/app'
import '@vtex/shoreline-components/styles'
import '@vtex/shoreline-tokens/styles'
import '@vtex/shoreline-date/styles'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
