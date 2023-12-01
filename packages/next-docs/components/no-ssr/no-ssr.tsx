import type { ReactNode } from 'react'
import React, { useState, useEffect } from 'react'

export function NoSSR(props: Props) {
  const { children, fallback = <></> } = props
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return <>{isClient ? children : fallback}</>
}

interface Props {
  children: ReactNode
  fallback?: ReactNode
}
