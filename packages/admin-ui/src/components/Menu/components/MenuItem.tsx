import type { ComponentPropsWithRef, ReactNode } from 'react'
import React from 'react'
import { alpha } from '@vtex/admin-ui-core'
import { jsx, tag } from '@vtex/admin-ui-react'
import { MenuItem as ReakitMenuItem } from 'reakit/Menu'

import { useMenuContext } from './MenuContext'

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
export const MenuItem = jsx(ReakitMenuItem)(
  {
    marginY: '2px',
    paddingX: 1,
    fontSize: 1,
    border: 'none',
    textTransform: 'initial',
    width: 'full',
    div: {
      justifyContent: 'flex-start',
    },
    height: 32,
    svg: {
      margin: 1,
      size: 20,
      minWidth: 20,
      minHeight: 20,
      marginLeft: 0,
      marginRight: 2,
    },
    fontFamily: 'sans',
    fontSettings: 'regular',
    borderRadius: 'default',
    cursor: 'pointer',
    position: 'relative',
    ':focus:not([data-focus-visible-added])': {
      outline: 'none',
      boxShadow: 'none',
    },
    variants: {
      dangerous: {
        true: {
          color: 'red',
          backgroundColor: 'transparent',
          ':focus': {
            bg: alpha('red.secondary.default', 0.32),
            outline: 'none',
            boxShadow: 'none',
          },
          ':hover': {
            color: 'red',
          },
          ':active': {
            color: 'red.pressed',
            backgroundColor: alpha('red.secondary.pressed', 0.32),
          },
          ':disabled': {
            color: 'mid.primary',
          },
        },
        false: {
          backgroundColor: 'transparent',
          color: 'dark.primary',
          ':focus': {
            bg: alpha('blue.secondary.default', 0.32),
            outline: 'none',
            boxShadow: 'none',
          },
          ':hover': {
            color: 'dark.primary',
          },
          ':active': {
            color: 'blue.pressed',
            backgroundColor: alpha('blue.secondary.pressed', 0.32),
          },
          ':disabled': {
            color: 'mid.primary',
          },
        },
      },
    },
  },
  {
    options: ['icon'],
    useOptions: (options: MenuItemOptions, props) => {
      const { children, onClick, ...buttonProps } = props
      const { icon } = options

      const { hideOnClick, state } = useMenuContext()

      return {
        ...buttonProps,
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
      }
    },
  }
)

MenuItem.defaultProps = {
  dangerous: false,
}

export interface MenuItemOptions {
  icon?: ReactNode
}

export type MenuItemProps = ComponentPropsWithRef<typeof MenuItem>
