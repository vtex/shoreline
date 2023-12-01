import type { ReactNode } from 'react'
import React from 'react'
import { useTheme } from 'nextra-theme-docs'

interface Props {
  children?: ReactNode
}

export function DarkMode(props: Props) {
  const { children } = props
  const mode = useTheme()

  if (mode.resolvedTheme === 'dark') {
    return <>{children}</>
  }

  return null
}

export function LightMode(props: Props) {
  const { children } = props
  const mode = useTheme()

  if (mode.resolvedTheme === 'light') {
    return <>{children}</>
  }

  return null
}
