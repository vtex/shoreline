import type { AppProps } from 'next/app'
import { GoogleAnalytics } from '@next/third-parties/google'
import '@vtex/shoreline/themes/sunrise/unlayered'
import '@vtex/shoreline-charts/css'
import './global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
    </>
  )
}
