/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import {
  Fragment,
  cloneElement,
  Children,
  ReactElement,
  FunctionComponentElement,
  Ref,
  forwardRef,
} from 'react'
import {
  useMenuState,
  Menu as RekitMenu,
  MenuItem as ReakitMenuItem,
  MenuButton,
  MenuState,
} from 'reakit/Menu'

import { Box } from '../Box'
import { Button, ButtonProps } from '../Button'

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
  const {
    disclosure,
    children,
    disabled = false,
    placement = 'bottom-start',
    sx = {},
    ...baseProps
  } = props

  const menu = useMenuState({ orientation: 'vertical', loop: true, placement })

  return (
    <Fragment>
      <MenuButton
        {...menu}
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
        {...menu}
        {...baseProps}
        disabled={disabled}
      >
        <Box sx={{ variant: `overlay.menu`, ...sx }}>
          {Children.map(children, (child, index) => (
            <ReakitMenuItem {...menu} {...child.props} key={index}>
              {(itemProps) => cloneElement(child, itemProps)}
            </ReakitMenuItem>
          ))}
        </Box>
      </RekitMenu>
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
 * <Menu discolure={<Button>Open menu</Button>}>
 *   <Menu.Item>Item one</Menu.Item>
 *   <Menu.Item>...</Menu.Item>
 * </Menu>
 * ```
 */
Menu.Item = forwardRef((props: MenuItemProps, ref: Ref<HTMLButtonElement>) => {
  return <Button ref={ref} variant="subtle" {...props} />
})

export type MenuItemProps = Omit<ButtonProps, 'variant' | 'iconPosition'>

export interface MenuProps extends Partial<Pick<MenuState, 'placement'>> {
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
}

export { Menu }
