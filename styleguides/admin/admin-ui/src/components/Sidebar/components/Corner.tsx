import React, { Children, cloneElement } from 'react'
import { isElement } from 'react-is'
import { SidebarSecretProps, CornerScope } from '../types'
import { Set } from '../../Set'

/**
 * Component used to organize the sidebar items on the top,
 * or bottom of its parent.
 */
export function SidebarCorner(props: SidebarCornerProps) {
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

export interface SidebarCornerProps extends SidebarSecretProps {
  /**
   * `scope` defines where the children will be arranged, on the top, or bottom.
   * This prop is invisible to the clients.
   * @default 'bottom'
   * @internal
   */
  scope?: CornerScope
}
