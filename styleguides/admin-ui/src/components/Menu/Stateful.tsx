import React from 'react'

import {
  StatelessMenu,
  StatelessMenuProps,
  MenuState,
  useMenuState,
} from './Stateless'

/**
 * Accessible menu component
 * @example
 * ```jsx
 * import { Menu, Button } from `@vtex/admin-ui`
 *
 * <Menu discolure={<Button>Open menu</Button>}>
 *   <Menu.Item>Item one</Menu.Item>
 *   <Menu.Item>...</Menu.Item>
 * </Menu>
 * ```
 */
function Menu(props: MenuProps) {
  const { placement = 'bottom-start', ...baseProps } = props

  const state = useMenuState({ orientation: 'vertical', loop: true, placement })

  return <StatelessMenu {...baseProps} state={state} />
}

/**
 * Accessible menu item component
 * ⚠️ You must use it within admin-ui/menu component context.
 * @example
 * ```jsx
 * import { Menu, Button } from `@vtex/admin-ui`
 *
 * <Menu discolure={<Button>Open menu</Button>}>
 *   <Menu.Item>Item one</Menu.Item>
 *   <Menu.Item>...</Menu.Item>
 * </Menu>
 * ```
 */
Menu.Item = StatelessMenu.Item

/**
 * Accessible menu separator
 * ⚠️ You must use it within admin-ui/menu component context.
 * @example
 * ```jsx
 * import { Menu, Button } from `@vtex/admin-ui`
 *
 * <Menu discolure={<Button>Open menu</Button>}>
 *   <Menu.Item>Item one</Menu.Item>
 *   <Menu.Item>...</Menu.Item>
 *   <Menu.Separator />
 *   <Menu.Item>...</Menu.Item>
 * </Menu>
 * ```
 */
Menu.Separator = StatelessMenu.Separator

export type MenuProps = Omit<StatelessMenuProps, 'state'> &
  Partial<Pick<MenuState, 'placement'>>

export { Menu }
