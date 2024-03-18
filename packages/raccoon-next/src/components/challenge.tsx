import type { ComponentType, PropsWithChildren } from 'react'
import React, { Suspense } from 'react'

import { SplashScreen } from './splash-screen'
import { Router } from './router'

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
