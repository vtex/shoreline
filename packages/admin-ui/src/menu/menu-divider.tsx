import { cx } from '@vtex/admin-ui-core'
import { MenuSeparator } from 'ariakit/menu'
import type { Ref } from 'react'
import React, { forwardRef } from 'react'

import { dividerTheme } from './menu.style'

export const MenuDivider = forwardRef(
  (props: MenuDividerProps, ref: Ref<HTMLHRElement>) => {
    const { className = '', ...hrProps } = props

    return (
      <MenuSeparator
        className={cx(dividerTheme, className)}
        ref={ref}
        {...hrProps}
      />
    )
  }
)

export type MenuDividerProps = React.ComponentPropsWithoutRef<'hr'>
