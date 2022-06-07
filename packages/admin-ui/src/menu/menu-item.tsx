import type { ComponentPropsWithRef, ReactNode } from 'react'
import React from 'react'
import { createComponent, tag, useElement } from '@vtex/admin-ui-react'
import { MenuItem as AriakitMenuItem } from 'ariakit/Menu'

import * as style from './menu.style'
import { useMenuContext } from './menu-context'

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
export const MenuItem = createComponent<
  typeof AriakitMenuItem,
  MenuItemOptions
>((props) => {
  const { children, onClick, icon, tone = 'main', ...buttonProps } = props

  const { hideOnClick, state } = useMenuContext()

  return useElement(AriakitMenuItem, {
    ...buttonProps,
    baseStyle: {
      ...style.item,
      ...style.itemVariants({ tone }),
    },
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
  })
})

// MenuItem.defaultProps = {
//   tone: 'main',
//   type: any,
// }

export interface MenuItemOptions {
  icon?: ReactNode
  type: any
  tone: any
}

export type MenuItemProps = ComponentPropsWithRef<typeof MenuItem>
