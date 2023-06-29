import type { ComponentType, PropsWithChildren } from 'react'
import React, { Suspense } from 'react'

import { useAdmin } from '../use-admin'
import { SplashScreen } from './splash-screen'

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
  useAdmin()

  return <>{children}</>
}
