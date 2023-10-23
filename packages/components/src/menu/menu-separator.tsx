import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { MenuSeparator as BaseMenuSeparator } from '@ariakit/react'

export const MenuSeparator = forwardRef<HTMLHRElement, MenuSeparatorProps>(
  function Menu(props, ref) {
    const { children, ...otherProps } = props

    return (
      <BaseMenuSeparator data-sl-menu-separator ref={ref} {...otherProps} />
    )
  }
)

export type MenuSeparatorProps = ComponentPropsWithoutRef<'hr'>
