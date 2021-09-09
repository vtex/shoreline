import type { Ref } from 'react'
import React, { forwardRef } from 'react'

import type { SetProps } from '../../Set'
import { Set } from '../../Set'

/**
 * Groups even-spaced SidebarItem's
 */
export const SidebarGroup = forwardRef(function SidebarGroup(
  props: SetProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    children,
    spacing = 1,
    orientation = 'vertical',
    role = 'menubar',
  } = props

  return (
    <Set ref={ref} spacing={spacing} orientation={orientation} role={role}>
      {children}
    </Set>
  )
})
