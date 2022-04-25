import type { Ref, ReactNode } from 'react'
import type { ComponentStyleProps } from '@vtex/admin-ui-react'
import React, { forwardRef } from 'react'

import type { StackProps } from '../../../stack'
import { Stack } from '../../../stack'

/**
 * Groups even-spaced SidebarItem's
 */
export const SidebarGroup = forwardRef(function SidebarGroup(
  props: SidebarGroupProps,
  ref: Ref<HTMLDivElement>
) {
  const { children, space = '$l', csx } = props

  return (
    <Stack
      ref={ref}
      space={space}
      role="menubar"
      csx={{
        width: '100%',
        ...csx,
      }}
    >
      {children}
    </Stack>
  )
})

export interface SidebarGroupProps extends ComponentStyleProps {
  children?: ReactNode
  space?: StackProps['space']
}
