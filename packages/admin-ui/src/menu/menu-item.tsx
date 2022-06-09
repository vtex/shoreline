import type { ComponentPropsWithRef, ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { MenuItem as AriakitMenuItem } from 'ariakit/Menu'
import type { VariantProps } from '@vtex/admin-ui-core'

import { Center } from '../center'

import * as style from './menu.style'

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
  const { children, onClick, icon, variant = 'neutral', ...buttonProps } = props

  return useElement(AriakitMenuItem, {
    ...buttonProps,
    baseStyle: {
      ...style.item,
      ...style.itemVariants({ variant }),
    },
    children: (
      <Center>
        {icon} {children}
      </Center>
    ),
  })
})

export type MenuItemOptions = VariantProps<typeof style.itemVariants> & {
  icon?: ReactNode
  children: ReactNode
}

export type MenuItemProps = ComponentPropsWithRef<typeof MenuItem>
