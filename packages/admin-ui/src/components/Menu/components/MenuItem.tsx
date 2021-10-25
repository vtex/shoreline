import type { ComponentPropsWithRef, ReactNode } from 'react'
import React from 'react'
import { jsx, tag } from '@vtex/admin-ui-react'
import { MenuItem as ReakitMenuItem } from 'reakit/Menu'
import { focusVisible } from '@vtex/admin-ui-core'

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
    variants: {
      tone: {
        main: {
          ...focusVisible('main'),
          bg: 'listBoxItem.main',
          color: 'listBoxItem.main',
          ':hover': {
            color: 'listBoxItem.mainHover',
            bg: 'listBoxItem.mainHover',
          },
          ':active': {
            color: 'listBoxItem.mainPressed',
            bg: 'listBoxItem.mainPressed',
          },
          ':disabled': {
            color: 'listBoxItem.mainDisabled',
            bg: 'listBoxItem.mainDisabled',
          },
        },
        critical: {
          ...focusVisible('critical'),
          bg: 'listBoxItem.critical',
          color: 'listBoxItem.critical',
          ':hover': {
            color: 'listBoxItem.criticalHover',
            bg: 'listBoxItem.criticalHover',
          },
          ':active': {
            color: 'listBoxItem.criticalPressed',
            bg: 'listBoxItem.criticalPressed',
          },
          ':disabled': {
            color: 'listBoxItem.criticalDisabled',
            bg: 'listBoxItem.criticalDisabled',
          },
        },
      },
    },
  },
  {
    options: ['icon'],
    useOptions: (options: MenuItemOptions, props) => {
      const { children, onClick, type = 'button', ...buttonProps } = props
      const { icon } = options

      const { hideOnClick, state } = useMenuContext()

      return {
        ...buttonProps,
        type,
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
  tone: 'main',
}

export interface MenuItemOptions {
  icon?: ReactNode
}

export type MenuItemProps = ComponentPropsWithRef<typeof MenuItem>
