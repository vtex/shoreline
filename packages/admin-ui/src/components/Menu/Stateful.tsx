import type { FunctionComponentElement } from 'react'
import React, { Fragment } from 'react'

import type { StatelessMenuProps } from './Stateless'
import { StatelessMenu } from './Stateless'
import type { MenuState } from './components'
import {
  MenuItem,
  useMenuState,
  ReakitMenuSeparator,
  MenuDisclosure,
} from './components'

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
export function Menu(props: MenuProps) {
  const {
    placement = 'bottom-start',
    disclosure,
    visible,
    baseId,
    ...baseProps
  } = props

  const state = useMenuState({
    orientation: 'vertical',
    loop: true,
    placement,
    visible,
    baseId,
  })

  return (
    <Fragment>
      <MenuDisclosure state={state}>{disclosure}</MenuDisclosure>
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
Menu.Item = MenuItem

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
Menu.Separator = ReakitMenuSeparator

export interface MenuProps
  extends Omit<StatelessMenuProps, 'state'>,
    Partial<Pick<MenuState, 'placement'>> {
  /**
   * Menu visibility toggle
   */
  disclosure: FunctionComponentElement<unknown>
  /**
   * If is initiallty visible
   * @default false
   */
  visible?: boolean
  /**
   * reakit baseId
   */
  baseId?: string
}
