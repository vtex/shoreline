import React, { cloneElement, FunctionComponentElement } from 'react'
import { Set } from '../../Set'
import { CornerScope, SidebarSecretProps } from '../utils'
import { SidebarItemProps } from './index'

export interface SidebarCornerProps extends SidebarSecretProps {
  children: FunctionComponentElement<SidebarItemProps>[]
  scope: CornerScope
}

export function SidebarCorner(props: Omit<SidebarCornerProps, 'state'>) {
  const { children, scope } = props

  return (
    <Set spacing={1} orientation="vertical">
      {children.map((child, index) =>
        // @ts-ignore
        cloneElement(child, { secret: scope, index })
      )}
    </Set>
  )
}
