import { jsx } from '@vtex/admin-ui-react'
import { MenuSeparator as ReakitMenuSeparator } from 'reakit'

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
export const MenuSeparator = jsx(ReakitMenuSeparator)({
  marginY: 2,
  borderStyle: 'solid',
  borderBottomWidth: 1,
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderColor: 'mid.secondary',
  width: (theme) => `calc(100% -${theme.space?.[3]})`,
  marginX: (theme) => `-${theme.space?.[3]}`,
  outline: 'none',
})
