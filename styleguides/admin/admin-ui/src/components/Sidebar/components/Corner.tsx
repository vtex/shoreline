import React, { cloneElement, FunctionComponentElement } from 'react'
import { Box } from '../../Box'
import { CornerScope, SidebarSecretProps } from '../utils'
import { SidebarItemProps } from './Item'

export interface SidebarCornerProps extends SidebarSecretProps {
  children: FunctionComponentElement<SidebarItemProps>[]
  scope: CornerScope
}

export function SidebarCorner(props: Omit<SidebarCornerProps, 'secret'>) {
  // @ts-ignore
  const { children, secret } = props

  return <Box>{children.map((child) => cloneElement(child, { secret }))}</Box>
}
