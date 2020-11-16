import React, { Ref } from 'react'
import { forwardRef } from '@vtex/admin-ui-system'

import { IconActions, IconCaret } from '../../../icons'
import { Button, ButtonProps } from '../../Button'

/**
 * Button used inside of menu's disclosure
 * @example
 * ```jsx
 * import { ActionButton, Menu } from `@vtex/admin-ui`
 * <Menu
 *   hideOnClick
 *   aria-label="menu label"
 *   disclosure={<ActionButton display="menu" />}
 * >
 *   ...
 * </Menu>
 * ```
 */
export const ActionButton = forwardRef(
  (props: ActionButtonProps, ref: Ref<HTMLButtonElement>) => {
    const { display = 'actions', ...buttonProps } = props

    const isActions = display === 'actions'
    const iconPosition = isActions ? 'start' : 'end'

    return (
      <Button
        ref={ref}
        icon={isActions ? <IconActions /> : <IconCaret direction="down" />}
        iconPosition={iconPosition}
        {...buttonProps}
      />
    )
  }
)

export interface ActionButtonProps
  extends Omit<ButtonProps, 'icon' | 'iconPosition'> {
  /**
   * Display dots icon if is actions and caret down if menu
   * @default actions
   */
  display?: 'actions' | 'menu'
}
