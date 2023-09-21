import type { AppProps } from 'next/app'
import { connect, bootstrap, useAdmin } from '@vtex/raccoon-next'
import { ThemeProvider } from '@vtex/admin-ui'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

connect()

function App({ Component, pageProps }: AppProps) {
  const ctx = useAdmin()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  // Routes that aren't declared on the nextjsRoutes property shouldn't be available here.
  useEffect(() => {
    // If the route is not internal (it's the base path), we can mount the app.
    if (!ctx.internalRoute) {
      setIsMounted(true)
      return
    }

    if (ctx.internalRoute) {
      const internalPath = ctx.internalRoute?.replace(ctx.basePath, '') || '/'
      const ioAndNextjsRoutingMatch = internalPath === router.asPath

      if (!ioAndNextjsRoutingMatch) {
        router.push(internalPath)
      }

      if (ioAndNextjsRoutingMatch) {
        setIsMounted(true)
      }
    }
  }, [ctx.internalRoute, router.asPath])

  if (!isMounted) {
    return <></>
  }

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default bootstrap(App)
