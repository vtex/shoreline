import React from 'react'
import type { AppProps } from 'next/app'
import { GoogleAnalytics } from '@next/third-parties/google'
import '@vtex/shoreline-theme-sunrise/css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
    </>
  )
}
