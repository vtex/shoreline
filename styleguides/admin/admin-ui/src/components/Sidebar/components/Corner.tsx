import React, { cloneElement, FunctionComponentElement } from 'react'
import { Set } from '../../Set'
import { CornerScope, SidebarSecretProps } from '../utils'
import { SidebarItemProps } from './index'

/**
 * Component used to organize the sidebar items on the top,
 * or bottom of its parent.
 */
export function SidebarCorner(props: SidebarCornerProps) {
  const { children, scope } = props

  return (
    <Set
      spacing={1}
      orientation="vertical"
      // @ts-ignore
      role="menubar"
    >
      {children.map((child, index) => cloneElement(child, { scope, index }))}
    </Set>
  )
}

export interface SidebarCornerProps extends SidebarSecretProps {
  /**
   * `children` must be an array of <Sidebar.Item {...props} /> components.
   */
  children: FunctionComponentElement<SidebarItemProps>[]
  /**
   * `scope` defines where the children will be arranged, on the top, or bottom.
   * This prop is invisible to the clients.
   * @default 'bottom'
   */
  scope: CornerScope
}
