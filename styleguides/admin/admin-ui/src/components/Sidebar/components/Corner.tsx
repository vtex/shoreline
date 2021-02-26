import React, { cloneElement, FunctionComponentElement } from 'react'
import { Box } from '../../Box'
import { CornerScope } from '../utils'
import { SidebarItemProps } from './Item'

export interface SidebarCornerProps {
  children: FunctionComponentElement<SidebarItemProps>[]
  scope: CornerScope
}

export function SidebarCorner(props: SidebarCornerProps) {
  const { children, scope } = props

  return (
    <Box>
      {children.map((child, index) =>
        cloneElement(child, {
          secret: {
            index,
            scope,
          },
        })
      )}
    </Box>
  )
}
