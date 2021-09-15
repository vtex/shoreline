import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import type { MenuStateReturn } from 'reakit/Menu'
import { jsx } from '@vtex/admin-ui-react'

import { MenuContext } from './MenuContext'

export const Menu = jsx.div(
  {},
  {
    options: ['hideOnClick', 'state'],
    useOptions(options: MenuOptions, props) {
      const { children, ...menuProps } = props

      return {
        ...menuProps,
        children: (
          <MenuContext.Provider value={options}>
            {children}
          </MenuContext.Provider>
        ),
      }
    },
  }
)

export interface MenuOptions {
  /**
   * If should hide the menu on click a item
   * @default false
   */
  hideOnClick?: boolean
  /**
   * Return of reakit's useMenuState
   */
  state: MenuStateReturn
}

export type MenuProps = ComponentPropsWithRef<typeof Menu>
