import React, { Children, cloneElement } from 'react'
import { isElement } from 'react-is'
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
      {children &&
        Children.map(
          children,
          (child, index) =>
            isElement(child) && cloneElement(child, { scope, index })
        )}
    </Set>
  )
}

export type SidebarCornerProps = Omit<_SidebarCornerProps, 'scope' | 'state'>

/**
 * Private interface
 */
export interface _SidebarCornerProps extends SidebarSecretProps {
  /**
   * `scope` defines where the children will be arranged, on the top, or bottom.
   * This prop is invisible to the clients.
   * @default 'bottom'
   */
  scope: CornerScope
}
