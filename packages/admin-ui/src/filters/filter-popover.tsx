import React, { useState } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { focusVisible } from '@vtex/admin-ui-core'

import type { MenuProps } from 'ariakit'
import { Menu } from 'ariakit'
import { PopoverProvider } from './filter-popover-context'

export const FilterPopover = createComponent<typeof Menu, MenuProps>(
  (props) => {
    const { children, ...restProps } = props

    const [isScrollableLayout, setIsScrollableLayout] = useState(false)

    return useElement(Menu, {
      baseStyle: {
        text: '$body',
        boxShadow: '$overlay.bottom',
        border: '$neutral',
        borderRadius: 'default',
        bg: '$primary',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 256,
        zIndex: 999,
        ...focusVisible('neutral'),
      },
      children: (
        <PopoverProvider value={{ isScrollableLayout, setIsScrollableLayout }}>
          {children}
        </PopoverProvider>
      ),
      ...restProps,
    })
  }
)
