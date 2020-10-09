/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import {
  cloneElement,
  Children,
  ReactElement,
  MouseEvent,
  forwardRef,
  Ref,
  FunctionComponentElement,
} from 'react'
import {
  useMenuState,
  Menu as ReakitMenu,
  MenuItem as ReakitMenuItem,
  MenuButton,
  MenuState,
  MenuStateReturn,
  MenuSeparator,
} from 'reakit/Menu'

import { Box } from '../Box'
import { Button, ButtonProps } from '../Button'

export { useMenuState, MenuState }
export { MenuStateReturn }

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
    sx = {},
    state,
    ...baseProps
  } = props

  return (
    <ReakitMenu
      sx={{
        // css reset
        border: 0,
        padding: 0,
        outline: 'none',
      }}
      {...state}
      {...baseProps}
      disabled={disabled}
    >
      <Box sx={{ variant: 'overlay.menu', ...sx }}>
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
    </ReakitMenu>
  )
}

interface MenuDisclosureProps extends MenuStateReturn {
  children: FunctionComponentElement<unknown>
}

export function MenuDisclosure({ children, ...props }: MenuDisclosureProps) {
  Children.only(children)

  return (
    <MenuButton {...props} ref={children.ref} {...children.props}>
      {(enhancedProps) => cloneElement(children, enhancedProps)}
    </MenuButton>
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
StatelessMenu.Item = forwardRef(function MenuItem(
  props: MenuItemProps,
  ref: Ref<HTMLButtonElement>
) {
  return <Button ref={ref} size="small" variant="text" {...props} />
})

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
StatelessMenu.Separator = MenuSeparator

export type MenuItemProps = Omit<ButtonProps, 'variant' | 'iconPosition'>

export interface StatelessMenuProps {
  /**
   * Menu items
   */
  children: ReactElement | ReactElement[]
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
