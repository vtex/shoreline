import { alpha } from '@vtex/onda-core'
import { merge } from '@vtex/admin-ui-util'
import { createComponent } from '@vtex/admin-jsxs'

import type { ButtonProps } from '../../Button'
import { Button } from '../../Button'

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
  const { dangerous = false, csx: overrides = {}, ...buttonProps } = props

  const variant = dangerous ? 'danger-tertiary' : 'tertiary'

  const csx = merge(
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
      svg: {
        marginLeft: 0,
        marginRight: 2,
      },
      ...(dangerous
        ? {
            color: 'red',
            ':focus': {
              bg: alpha('red.secondary.default', 0.32),
              outline: 'none',
              boxShadow: 'none',
            },
            ':hover': {
              color: 'red',
            },
          }
        : {
            color: 'dark.primary',
            ':focus': {
              bg: alpha('blue.secondary.default', 0.32),
              outline: 'none',
              boxShadow: 'none',
            },
            ':hover': {
              color: 'dark.primary',
            },
          }),
    },
    overrides
  )

  return {
    size: 'small',
    csx,
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
