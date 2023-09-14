import type { ComponentType, PropsWithChildren } from 'react'
import React, { Suspense } from 'react'

import { useAdmin } from '../use-admin'
import { SplashScreen } from './splash-screen'
import { useRouter } from 'next/router'
import { useNavigation } from '../router'

export function Challenge({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<SplashScreen />}>
      <Suspender>{children}</Suspender>
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

function Suspender({ children }: PropsWithChildren) {
  const ctx = useAdmin()
  const router = useRouter()
  const { navigate } = useNavigation()

  // TODO: Explain hack
  if (router.route === '/_error') {
    const ioFallbackDirective = 'io=true'

    let { pathname, searchParams } = new URL(ctx.topWindowHref)
    const navigationFallbackDirective = searchParams.get('io')

    if (
      !navigationFallbackDirective ||
      navigationFallbackDirective !== 'true'
    ) {
      pathname = pathname.concat(
        pathname.includes('?') ? '&' : '?' + ioFallbackDirective
      )

      navigate(pathname, {
        type: 'adminRelativeNavigation',
      })
    }
  }

  if (router.route === '/_error') {
    return <></>
  }

  return <>{children}</>
}
