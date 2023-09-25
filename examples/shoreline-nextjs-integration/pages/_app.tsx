import type { AppProps } from 'next/app'
import { connect, bootstrap } from '@vtex/raccoon-next'
import { ThemeProvider } from '@vtex/admin-ui'

connect()

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default bootstrap(App)
