import type { ComponentPropsWithRef, ReactNode } from 'react'
import React from 'react'
import { jsx, tag } from '@vtex/admin-ui-react'
import { MenuItem as ReakitMenuItem } from 'reakit/Menu'

import * as style from '../Menu.style'
import { useMenuContext } from './MenuContext'

/**
 * Accessible menu item component
 * ⚠️ You must use it within admin-ui/menu component context.
 * @example
 * ```jsx
 * import { Menu, MenuList, MenuItem, useMenuState, MenuButton } from `@vtex/admin-ui`
 *
 * const state = useMenuState()
 *
 * <Menu state={state}>
 *   <MenuButton>Open Menu</MenuButton>
 *   <MenuList aria-label="Menu">
 *     <MenuItem>Item one</MenuItem>
 *     <MenuItem>...</MenuItem>
 *   </MenuList>
 * </Menu>
 * ```
 */
export const MenuItem = jsx(ReakitMenuItem)(
  {
    ...style.item,
    variants: {
      tone: {
        main: style.itemVariant('main'),
        critical: style.itemVariant('critical'),
      },
    },
  },
  {
    options: ['icon'],
    useOptions: (options: MenuItemOptions, props) => {
      const { children, onClick, type = 'button', ...buttonProps } = props
      const { icon } = options

      const { hideOnClick, state } = useMenuContext()

      return {
        ...buttonProps,
        type,
        state,
        onClick(e) {
          hideOnClick && state.hide()
          onClick?.(e)
        },
        children: (
          <tag.div
            csx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon} {children}
          </tag.div>
        ),
      }
    },
  }
)

MenuItem.defaultProps = {
  tone: 'main',
}

export interface MenuItemOptions {
  icon?: ReactNode
}

export type MenuItemProps = ComponentPropsWithRef<typeof MenuItem>
