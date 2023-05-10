import type { ReactNode } from 'react'
import React from 'react'
import './global.css'

/**
 * Wraps the application with global styles
 * @example
 * <Global>
 *  <App />
 * </Global>
 */
export function Global(props: GlobalProps) {
  const { children } = props

  return <>{children}</>
}

interface GlobalProps {
  children: ReactNode
}
