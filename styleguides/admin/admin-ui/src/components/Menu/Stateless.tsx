import React, { cloneElement, Children, MouseEvent, ReactNode } from 'react'
import { isElement } from 'react-is'

import {
  AriaMenu,
  AriaMenuSeparator,
  MenuStateReturn,
  AriaMenuItem,
  MenuItem,
} from './components'
import { Overridable } from '../../types'
import { Box } from '../Box'
import { cn } from '../../system'

/**
 * Stateless accessible menu component
 * With this approach, you may have control of all menu state
 * Must be used alongside useMenuState
 * @example
 * ```jsx
 * import { StatelessMenu, MenuDisclosure, useMenuState, Button } from `@vtex/admin-ui`
 *
 * const state = useMenuState()
 *
 * <MenuDisclosure><Button>Open menu</Button></MenuDisclosure>
 * <Menu state={state}>
 *   <Menu.Item>Item one</Menu.Item>
 *   <Menu.Item>...</Menu.Item>
 * </Menu>
 * ```
 */
export function StatelessMenu(props: StatelessMenuProps) {
  const {
    children,
    disabled = false,
    hideOnClick = false,
    styleOverrides,
    state,
    'data-boxtestid': boxTestId,
    ...baseProps
  } = props

  return (
    <AriaMenu
      className={cn({
        border: 0,
        padding: 0,
        outline: 'none',
        zIndex: 999,
      })}
      {...state}
      {...baseProps}
      disabled={disabled}
    >
      <Box
        themeKey="components.menu"
        styles={styleOverrides}
        data-testid={boxTestId}
      >
        {Children.map(
          children,
          (child, index) =>
            isElement(child) && (
              <AriaMenuItem {...state} {...child.props} key={index}>
                {(itemProps) =>
                  cloneElement(child, {
                    ...itemProps,
                    onClick: (e: MouseEvent) => {
                      hideOnClick && state.hide()
                      itemProps?.onClick?.(e)
                    },
                  })
                }
              </AriaMenuItem>
            )
        )}
      </Box>
    </AriaMenu>
  )
}

/**
 * Accessible menu item component
 * ⚠️ You must use it within admin-ui/menu component context.
 * @example
 * ```jsx
 * import { StatelessMenu, Button } from `@vtex/admin-ui`
 *
 * <StatelessMenu discolure={<Button>Open menu</Button>}>
 *   <StatelessMenu.Item>Item one</StatelessMenu.Item>
 *   <StatelessMenu.Item>...</StatelessMenu.Item>
 * </StatelessMenu>
 * ```
 */
StatelessMenu.Item = MenuItem

/**
 * Accessible menu separator
 * ⚠️ You must use it within admin-ui/menu component context.
 * @example
 * ```jsx
 * import { StatelessMenu, Button } from `@vtex/admin-ui`
 *
 * <StatelessMenu discolure={<Button>Open menu</Button>}>
 *   <StatelessMenu.Item>Item one</StatelessMenu.Item>
 *   <StatelessMenu.Item>...</StatelessMenu.Item>
 *   <StatelessMenu.Separator />
 *   <StatelessMenu.Item>...</StatelessMenu.Item>
 * </StatelessMenu>
 * ```
 */
StatelessMenu.Separator = AriaMenuSeparator

export interface StatelessMenuProps extends Overridable {
  /**
   * Menu items
   */
  children?: ReactNode
  /**
   * aria-label of menu
   */
  'aria-label': string
  /**
   * If is disabled or not
   * @default false
   */
  disabled?: boolean
  /**
   * If should hide the menu on click a item
   * @default false
   */
  hideOnClick?: boolean
  /**
   * Return of reakit's useMenuState
   */
  state: MenuStateReturn
  /**
   * testid of the menu box
   */
  'data-boxtestid'?: string
}
