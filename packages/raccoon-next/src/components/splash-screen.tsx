import React, { useEffect, useState } from 'react'

import { Center, Container, Skeleton } from './layout'
import { isDev, isIframe } from '../utils/env'

export function SplashScreen() {
  const display = useDisplay()

  switch (display) {
    case 'auth':
      return (
        <Container>
          <Skeleton />
        </Container>
      )

    case 'deny':
      return (
        <Container>
          <p>You need to be on VTEX Admin to access this app</p>
        </Container>
      )

    case 'tip':
      return (
        <Container>
          <Center>
            <p>Authenticating App</p>
          </Center>
          <p>
            If this takes a long time, open this app on VTEX Admin to gather
            tokens and then open this page again
          </p>
        </Container>
      )
  }
}

/**
 * Hook to control the status to display
 */
function useDisplay() {
  const [display, setDisplay] = useState<'auth' | 'deny' | 'tip'>('auth')

  useEffect(() => {
    if (!isIframe() && !isDev()) {
      setDisplay('deny')
    } else if (!isIframe() && isDev()) {
      setDisplay('tip')
    }
  }, [])

  return display
}
