import React, { cloneElement } from 'react'
import { Set } from '../../Set'
import { SidebarSecretProps, CornerScope } from '../types'

/**
 * Component used to organize the sidebar items on the top,
 * or bottom of its parent.
 */
export function SidebarCorner(props: _SidebarCornerProps) {
  const { children, scope } = props

  return (
    <Set spacing={1} orientation="vertical" role="menubar">
      {children
        ? Array.isArray(children)
          ? children.map((child, index) =>
              cloneElement(child, { scope, index })
            )
          : cloneElement(children, { scope, index: 0 })
        : null}
    </Set>
  )
}

export type SidebarCornerProps = Omit<_SidebarCornerProps, 'scope'>

/**
 * Private interface
 */
export interface _SidebarCornerProps extends Omit<SidebarSecretProps, 'state'> {
  /**
   * `scope` defines where the children will be arranged, on the top, or bottom.
   * This prop is invisible to the clients.
   * @default 'bottom'
   */
  scope: CornerScope
}
