import React, { FunctionComponentElement, cloneElement } from 'react'
import { Set } from '../../Set'
import { CornerScope, SidebarSecretProps } from '../utils'
import { SidebarItemProps } from './index'

export interface SidebarCornerProps extends SidebarSecretProps {
  children: FunctionComponentElement<SidebarItemProps>[]
  scope: CornerScope
}

export function SidebarCorner(props: Omit<SidebarCornerProps, 'secret'>) {
  const { children } = props

  return (
    <Set spacing={1} orientation="vertical">
      {/* @ts-ignore */}
      {children.map((child) => cloneElement(child, { secret: props.secret }))}
    </Set>
  )
}
