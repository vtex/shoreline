import type { Ref, ReactNode } from 'react'
import type { CsxCall } from '@vtex/admin-ui-react'
import React, { forwardRef } from 'react'

import { Set } from '../../Set'

/**
 * Groups even-spaced SidebarItem's
 */
export const SidebarGroup = forwardRef(function SidebarGroup(
  props: SidebarGroupProps,
  ref: Ref<HTMLDivElement>
) {
  const { children, spacing = 1, csx } = props

  return (
    <Set
      ref={ref}
      spacing={spacing}
      orientation="vertical"
      role="menubar"
      csx={csx}
    >
      {children}
    </Set>
  )
})

export interface SidebarGroupProps extends CsxCall {
  children?: ReactNode
  spacing?: number
}
