import React, { forwardRef, Ref } from 'react'

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
export const MenuItem = forwardRef(function MenuItem(
  props: MenuItemProps,
  ref: Ref<HTMLButtonElement>
) {
  return <Button ref={ref} size="small" variant="text" {...props} />
})

export type MenuItemProps = Omit<ButtonProps, 'variant' | 'iconPosition'>
