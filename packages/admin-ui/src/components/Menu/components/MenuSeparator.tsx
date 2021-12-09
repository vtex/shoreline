import type { ComponentPropsWithRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'
import { MenuSeparator as ReakitMenuSeparator } from 'reakit'

import * as style from '../Menu.style'

/**
 * Accessible menu separator
 * ⚠️ You must use it within admin-ui/menu component context.
 * @example
 * ```jsx
 * import { Menu, MenuList, MenuButton, MenuItem, MenuSeparator, useMenuState } from `@vtex/admin-ui`
 *
 * const state = useMenuState()
 *
 * <Menu state={state}>
 *   <MenuButton>Open Menu</MenuButton>
 *   <MenuList aria-label="Menu">
 *     <MenuItem>Item one</MenuItem>
 *     <MenuItem>...</MenuItem>
 *     <MenuSeparator />
 *     <MenuItem>...</MenuItem>
 *   </MenuList>
 * </Menu>
 * ```
 */
export const MenuSeparator = jsx(ReakitMenuSeparator)(style.separator)

export type MenuSeparatorProps = ComponentPropsWithRef<typeof MenuSeparator>
