import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

import { listenForAdminShellEvents } from './message'
import { withChallenge } from './components/challenge'

export function connect() {
  if (typeof window !== 'undefined') {
    listenForAdminShellEvents()
  }
}

export function bootstrap<P>(Component: ComponentType<P>): any {
  return dynamic(() => Promise.resolve(withChallenge(Component)), {
    ssr: false,
  })
}
