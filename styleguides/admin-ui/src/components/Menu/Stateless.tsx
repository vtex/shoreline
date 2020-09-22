/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import {
  Fragment,
  cloneElement,
  Children,
  ReactElement,
  FunctionComponentElement,
  MouseEvent,
} from 'react'
import {
  useMenuState,
  Menu as RekitMenu,
  MenuItem as ReakitMenuItem,
  MenuButton,
  MenuState,
  MenuStateReturn,
} from 'reakit/Menu'

import { Box } from '../Box'

export { useMenuState, MenuState }

/**
 * Stateless accessible menu component
 * With this approach you may have controll of all menu state
 * Must be used alongside useMenuState
 * @example
 * ```jsx
 * import { StatelessMenu, useMenuState, Button } from `@vtex/admin-ui`
 *
 * const state = useMenuState()
 *
 * //Will also show the menu
 * <Button onClick={state.show}>Programatically Show</Button>
 *
 * <Menu state={state} discolure={<Button>Open menu</Button>}>
 *   <Menu.Item>Item one</Menu.Item>
 *   <Menu.Item>...</Menu.Item>
 * </Menu>
 * ```
 */
export function StatelessMenu(props: StatelessMenuProps) {
  const {
    disclosure,
    children,
    disabled = false,
    hideOnClick = false,
    sx = {},
    state,
    ...baseProps
  } = props

  return (
    <Fragment>
      <MenuButton
        {...state}
        disabled={disabled}
        ref={disclosure.ref}
        {...disclosure.props}
      >
        {(disclosureProps) => cloneElement(disclosure, disclosureProps)}
      </MenuButton>
      <RekitMenu
        sx={{
          border: 0,
          background: 'none',
          padding: 0,
          outline: 'none',
        }}
        {...state}
        {...baseProps}
        disabled={disabled}
      >
        <Box sx={{ variant: `overlay.menu`, ...sx }}>
          {Children.map(children, (child, index) => (
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
          ))}
        </Box>
      </RekitMenu>
    </Fragment>
  )
}

export interface StatelessMenuProps {
  /**
   * Menu visibility toggle
   */
  disclosure: FunctionComponentElement<unknown>
  /**
   * Menu items
   */
  children: ReactElement[]
  /**
   * aria-label of menu
   */
  'aria-label': string
  /**
   * Custom box sytles
   * @default {}
   */
  sx?: SxStyleProp
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
}
