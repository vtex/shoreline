import type { ComponentPropsWithRef, ReactNode } from 'react'
import React from 'react'
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
          color: 'action.dangerTertiary',
          bg: 'action.dangerTertiary',
          ':focus': {
            bg: 'action.dangerTertiaryHover',
            outline: 'none',
            boxShadow: 'none',
          },
          ':hover': {
            color: 'action.dangerTertiaryHover',
            bg: 'action.dangerTertiaryHover',
          },
          ':active': {
            color: 'action.dangerTertiaryPressed',
            backgroundColor: 'action.dangerTertiaryPressed',
          },
          ':disabled': {
            color: 'action.disabled',
            bg: 'action.disabled',
          },
        },
        false: {
          backgroundColor: 'action.tertiary',
          color: 'dark.primary',
          ':focus': {
            bg: 'action.tertiaryHover',
            outline: 'none',
            boxShadow: 'none',
          },
          ':hover': {
            color: 'action.tertiaryHover',
            bg: 'action.tertiaryHover',
          },
          ':active': {
            color: 'action.tertiaryPressed',
            backgroundColor: 'action.tertiaryPressed',
          },
          ':disabled': {
            color: 'action.disabled',
            bg: 'action.disabled',
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
  dangerous: false,
}

export interface MenuItemOptions {
  icon?: ReactNode
}

export type MenuItemProps = ComponentPropsWithRef<typeof MenuItem>
