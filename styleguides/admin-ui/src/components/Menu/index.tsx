/** @jsx jsx */
import { jsx, Flex, SxStyleProp } from 'theme-ui'
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
  MenuItem,
  MenuButton,
  MenuState,
} from 'reakit/Menu'
import { mergeSx, useComponentSx } from '@vtex-components/theme'

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
    label,
    disabled = false,
    placement = 'bottom-start',
    sx = {},
    ...baseProps
  } = props

  const menu = useMenuState({ orientation: 'vertical', loop: true, placement })
  const componentStyles = useComponentSx('menu', {})
  const styles = mergeSx<SxStyleProp>(componentStyles, sx)

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
        aria-label={label}
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
        <Flex sx={styles}>
          {Children.map(children, (child, index) => (
            <MenuItem {...menu} {...child.props} key={index}>
              {(itemProps) => cloneElement(child, itemProps)}
            </MenuItem>
          ))}
        </Flex>
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
  const { sx = {}, ...buttonProps } = props

  const componentStyles = useComponentSx('menu--item', {})
  const styles = mergeSx<SxStyleProp>(componentStyles, sx)

  return <Button ref={ref} sx={styles} variant="subtle" {...buttonProps} />
})

export type MenuItemProps = Omit<ButtonProps, 'variant' | 'iconPosition'>

export interface MenuProps extends Pick<MenuState, 'placement'> {
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
  label: string
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
