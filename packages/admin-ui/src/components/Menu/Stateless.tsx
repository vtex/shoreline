import type { MouseEvent, ReactNode } from 'react'
import React, { cloneElement, Children } from 'react'
import { isElement } from 'react-is'
import { IconContainer } from '@vtex/admin-ui-icons'
import { useSystem } from '@vtex/admin-ui-core'

import { Box } from '../Box'
import type { MenuStateReturn } from './components'
import {
  ReakitMenu,
  ReakitMenuSeparator,
  ReakitMenuItem,
  MenuItem,
} from './components'
import type { SystemComponent } from '../../types'

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
    csx,
    state,
    'data-boxtestid': boxTestId,
    ...baseProps
  } = props

  const { cn } = useSystem()

  return (
    <ReakitMenu
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
        csx={{
          display: 'flex',
          flexDirection: 'column',
          bg: 'light.primary',
          marginTop: 1,
          padding: 3,
          minWidth: 18,
          borderRadius: 3,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'mid.secondary',
          boxShadow: 'menu',
          hr: {
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
          },
          ...csx,
        }}
        data-testid={boxTestId}
      >
        <IconContainer space="small">
          {Children.map(
            children,
            (child, index) =>
              isElement(child) && (
                <ReakitMenuItem {...state} {...child.props} key={index}>
                  {(itemProps) =>
                    cloneElement(child, {
                      ...itemProps,
                      onClick: (e: MouseEvent) => {
                        hideOnClick && state.hide()
                        itemProps?.onClick?.(e)
                      },
                    })
                  }
                </ReakitMenuItem>
              )
          )}
        </IconContainer>
      </Box>
    </ReakitMenu>
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
StatelessMenu.Separator = ReakitMenuSeparator

export interface StatelessMenuProps extends SystemComponent {
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
