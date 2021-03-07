import React, { cloneElement, FunctionComponentElement } from 'react'
import { Set } from '../../Set'
import { CornerScope, SidebarSecretProps } from '../utils'
import { SidebarItemProps } from './index'

export interface _SidebarCornerProps extends SidebarSecretProps {
  children: FunctionComponentElement<SidebarItemProps>[]
  scope: CornerScope
}

export interface SidebarCornerProps
  extends Omit<_SidebarCornerProps, 'state'> {}

export function SidebarCorner(props: SidebarCornerProps) {
  const { children, scope } = props

  return (
    <Set spacing={1} orientation="vertical">
      {children.map((child, index) => cloneElement(child, { scope, index }))}
    </Set>
  )
}
