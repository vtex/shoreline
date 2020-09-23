import React, { Fragment, FunctionComponentElement } from 'react'

import {
  StatelessMenu,
  StatelessMenuProps,
  MenuState,
  useMenuState,
  MenuDisclosure,
} from './Stateless'

/**
 * Accessible menu component
 * @example
 * ```jsx
 * import { Menu, Button } from `@vtex/admin-ui`
 *
 * <Menu disclosure={<Button>Open menu</Button>}>
 *   <Menu.Item>Item one</Menu.Item>
 *   <Menu.Item>...</Menu.Item>
 * </Menu>
 * ```
 */
function Menu(props: MenuProps) {
  const { placement = 'bottom-start', disclosure, ...baseProps } = props

  const state = useMenuState({ orientation: 'vertical', loop: true, placement })

  return (
    <Fragment>
      <MenuDisclosure {...state}>{disclosure}</MenuDisclosure>
      <StatelessMenu {...baseProps} state={state} />
    </Fragment>
  )
}

/**
 * Accessible menu item component
 * ⚠️ You must use it within admin-ui/menu component context.
 * @example
 * ```jsx
 * import { Menu, Button } from `@vtex/admin-ui`
 *
 * <Menu disclosure={<Button>Open menu</Button>}>
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
 * <Menu disclosure={<Button>Open menu</Button>}>
 *   <Menu.Item>Item one</Menu.Item>
 *   <Menu.Item>...</Menu.Item>
 *   <Menu.Separator />
 *   <Menu.Item>...</Menu.Item>
 * </Menu>
 * ```
 */
Menu.Separator = StatelessMenu.Separator

export interface MenuProps
  extends Omit<StatelessMenuProps, 'state'>,
    Partial<Pick<MenuState, 'placement'>> {
  /**
   * Menu visibility toggle
   */
  disclosure: FunctionComponentElement<unknown>
}

export { Menu }
