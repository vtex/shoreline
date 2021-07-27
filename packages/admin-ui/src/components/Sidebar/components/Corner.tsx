import React from 'react'
import { Set, SetProps } from '../../Set'

/**
 * Component used to organize the sidebar items on the top,
 * or bottom of its parent.
 */
export function SidebarCorner(props: SetProps) {
  const { children } = props

  return (
    <Set spacing={1} orientation="vertical" role="menubar">
      {children}
    </Set>
  )
}
