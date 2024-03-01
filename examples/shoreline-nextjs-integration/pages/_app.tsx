import type { AppProps } from 'next/app'
import { connect, bootstrap } from '@vtex/raccoon-next'
import '@vtex/shoreline-theme-sunrise/css'

connect()

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default bootstrap(App)
