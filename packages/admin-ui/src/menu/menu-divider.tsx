import type { ComponentPropsWithRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'
import { MenuSeparator } from 'ariakit/Menu'

import * as style from './menu.style'

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
export const MenuDivider = jsx(MenuSeparator)(style.divider)

export type MenuDividerProps = ComponentPropsWithRef<typeof MenuDivider>
