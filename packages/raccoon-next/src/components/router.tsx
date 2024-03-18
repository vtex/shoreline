import type { PropsWithChildren } from 'react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAdmin } from '../use-admin'
import { useNavigation } from '../router'

/**
 * This component is responsible for handling the routing of the application.
 * It sends the navigation events to the Admin Shell, which is responsible for
 * validating it and forwarding it back to the application.
 */
export function Router({ children }: PropsWithChildren) {
  const ctx = useAdmin()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const { navigate } = useNavigation()

  // Handles pop state events that are triggered by the browser's back
  // and forward buttons. We handle it manually to forward the navigation
  // to the Admin Shell.
  useEffect(() => {
    router.beforePopState(({ as }) => {
      const raccoonUrl = ctx.basePath + as

      if (ctx.path && raccoonUrl !== ctx.path) {
        navigate(as)

        return false
      }

      return true
    })
  }, [router])

  // Routes that aren't declared on the routes property shouldn't be available here.
  useEffect(() => {
    // If the route is not internal (it's the base path), we can mount the app.
    // This is also a backward compatible check, since the path is only available
    // apps using the most recent version of the @vtex/raccoon-next package.
    if (!ctx.path) {
      setIsMounted(true)

      return
    }

    const internalPath = ctx.path?.replace(ctx.basePath, '') || '/'
    const ioAndNextjsRoutingMatch = internalPath === router.asPath

    if (!ioAndNextjsRoutingMatch) {
      router.push(internalPath)
    }

    if (ioAndNextjsRoutingMatch) {
      setIsMounted(true)
    }
  }, [ctx.path, router.asPath])

  if (!isMounted) {
    return <></>
  }

  return <>{children}</>
}
