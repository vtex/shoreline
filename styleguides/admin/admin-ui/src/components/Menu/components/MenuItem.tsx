import { useSystem, merge, createComponent } from '@vtex/admin-core'

import { Button, ButtonProps } from '../../Button'

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
export const MenuItem = createComponent(Button, useMenuItem)

function useMenuItem(props: MenuItemProps): ButtonProps {
  const {
    dangerous = false,
    styleOverrides: overrides = {},
    ...buttonProps
  } = props
  const { stylesOf } = useSystem()

  const variant = dangerous ? 'danger-tertiary' : 'tertiary'
  const styles = stylesOf(
    dangerous ? 'components.menu.item-dangerous' : 'components.menu.item'
  )
  const styleOverrides = merge(styles, overrides)

  return {
    size: 'small',
    styleOverrides,
    variant,
    ...buttonProps,
  }
}

export interface MenuItemProps
  extends Omit<ButtonProps, 'variant' | 'iconPosition'> {
  /**
   * If performs a dangerous action
   * @default false
   */
  dangerous?: boolean
}
