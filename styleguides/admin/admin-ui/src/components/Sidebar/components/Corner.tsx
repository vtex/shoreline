import React, { cloneElement, FunctionComponentElement } from 'react'
import { Box } from '../../Box'
import { CornerScope } from '../utils'
import { SidebarItemProps } from './Item'

export interface SidebarCornerProps {
  children: FunctionComponentElement<SidebarItemProps>[]
  scope: CornerScope
}

export function SidebarCorner(props: SidebarCornerProps) {
  const { children } = props

  const clonedChildren = children.forEach((child) => {
    return cloneElement(child, { ...props })
  })

  console.log({ clonedChildren })

  return (
    <Box>
      {/* @ts-ignore */}
      {children.map((child, index) => cloneElement(child, { ...props, index }))}
    </Box>
  )
}
