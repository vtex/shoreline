import type { ComponentType, PropsWithChildren } from 'react'
import React, { Suspense, useEffect, useState } from 'react'

import { SplashScreen } from './splash-screen'
import { useAdmin } from '../use-admin'
import { useRouter } from 'next/router'
import { useNavigation } from '../router'

export function Challenge({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<SplashScreen />}>
      <Router>{children}</Router>
    </Suspense>
  )
}

export function withChallenge<P>(WrappedComponent: ComponentType<P>) {
  return function Component(props: any) {
    return (
      <Challenge>
        <WrappedComponent {...props} />
      </Challenge>
    )
  }
}

const ADMIN_BASE_PATH = '/admin'

function Router({ children }: PropsWithChildren) {
  const ctx = useAdmin()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const { navigate } = useNavigation()

  // Handles pop state events that are triggered by the browser's back
  // and forward buttons. We handle it manually to forward the navigation
  // to the Admin Shell.
  useEffect(() => {
    router.beforePopState(({ as }) => {
      const raccoonUrl = ADMIN_BASE_PATH + as

      if (ctx.path && raccoonUrl !== ctx.path) {
        navigate(as)

        return false
      }

      return true
    })
  }, [router])

  // Routes that aren't declared on the routes property shouldn't be available here.
  useEffect(() => {
    const { production, devUrl, prodUrl } = ctx

    // Get pathname from devUrl and prodUrl
    const [devPathname, prodPathname] = [devUrl, prodUrl].map((url) => {
      if (url) {
        const urlObj = new URL(url)
        return urlObj.pathname
      }

      return '/'
    })

    // Compare them to make sure they match
    if (devPathname !== prodPathname) {
      // We shouldn't necessarily throw an error here, since the app might be in development
      console.warn(
        `The devUrl and prodUrl pathnames are different. devUrl: ${devPathname}, prodUrl: ${prodPathname}. Ensure that the pathnames for both environments are the same to guarantee consistency`
      )
    }

    // Get the app base path based on the environment
    const appBasePath = production ? prodPathname : devPathname

    // If the route is not internal (it's the base path), we can mount the app.
    // This is also a backward compatible check, since the path is only available
    // apps using the most recent version of the @vtex/raccoon-next package.
    if (!ctx.path) {
      console.warn(
        `${prodUrl} is using an outdated version of @vtex/raccoon-next. Please update the package to the latest version.`
      )
      setIsMounted(true)

      return
    }

    /**
     * Remaining path is the path that comes after the base path
     *
     * @example
     * base path relative to the admin -> `/admin/rocket`
     * current path relative to the admin -> `/admin/rocket/nextjs-internal-route`
     * remaining path which should map back to the next.js app -> `/nextjs-internal-route`
     */
    const remainingPath = ctx.path?.replace(ctx.basePath, '')
    /**
     * The internal path is the path that the app should be mounted on
     */
    const internalPath =
      (appBasePath === '/' ? '' : appBasePath) + remainingPath || appBasePath

    const ioAndNextjsRoutingMatch = internalPath === router.asPath

    if (!ioAndNextjsRoutingMatch) {
      // If the internal path doesn't match the current path, we navigate to the internal path
      // to sync the admin shell with the app's internal state
      router.push(internalPath)
    }

    if (ioAndNextjsRoutingMatch) {
      // If the internal path matches the current path, we can mount the app
      setIsMounted(true)
    }
  }, [ctx.path, router.asPath])

  if (!isMounted) {
    return <></>
  }

  return <>{children}</>
}
