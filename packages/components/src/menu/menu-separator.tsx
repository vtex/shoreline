import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { MenuSeparator as BaseMenuSeparator } from '@ariakit/react'

import './menu-separator.css'

export const MenuSeparator = forwardRef<HTMLHRElement, MenuSeparatorProps>(
  function Menu(props, ref) {
    return <BaseMenuSeparator data-sl-menu-separator ref={ref} {...props} />
  }
)

export type MenuSeparatorProps = ComponentPropsWithoutRef<'hr'>
