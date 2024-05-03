import React, { forwardRef } from 'react'
import { MenuSeparator as BaseMenuSeparator } from '@ariakit/react'
import type { DividerOptions, DividerProps } from '../divider'

/**
 * Separator of MenuItems
 */
export const MenuSeparator = forwardRef<HTMLHRElement, MenuSeparatorProps>(
  function Menu(props, ref) {
    return <BaseMenuSeparator data-sl-menu-separator ref={ref} {...props} />
  }
)

export type MenuSeparatorOptions = DividerOptions
export type MenuSeparatorProps = DividerProps
