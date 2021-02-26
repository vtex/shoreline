import React, { cloneElement, FunctionComponentElement } from 'react'
import { Box } from '../../Box'
import { CornerScope } from '../utils'
import { SidebarItemProps } from './Item'
import { useMenuState } from './AriaSidebar'

export interface SidebarCornerProps {
  children: FunctionComponentElement<SidebarItemProps>[]
  scope: CornerScope
}

export function SidebarCorner(props: SidebarCornerProps) {
  const { children } = props

  const state = useMenuState({
    orientation: 'vertical',
    loop: true,
  })

  return (
    <Box>
      {children.map((child) => cloneElement(child, { secret: { state } }))}
    </Box>
  )
}
