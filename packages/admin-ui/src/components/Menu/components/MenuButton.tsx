import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { IconAction, IconCaret } from '@vtex/admin-ui-icons'
import { MenuButton as ReakitMenuButton } from 'reakit/Menu'

import type { ButtonProps } from '../../Button'
import { Button } from '../../Button'
import { useMenuContext } from '../context'

export const MenuButton = forwardRef(
  (props: MenuButtonProps, ref: Ref<HTMLButtonElement>) => {
    const { children, display = 'menu', ...buttonProps } = props

    const { state } = useMenuContext()

    const isActions = display === 'actions'
    const iconPosition = isActions ? 'start' : 'end'

    return (
      <Button
        as={ReakitMenuButton}
        {...state}
        ref={ref}
        icon={isActions ? <IconAction /> : <IconCaret direction="down" />}
        iconPosition={iconPosition}
        {...buttonProps}
      >
        {children}
      </Button>
    )
  }
)

export interface MenuButtonProps extends ButtonProps {
  /**
   * Display dots icon if is actions and caret down if menu
   * @default actions
   */
  display?: 'actions' | 'menu'
}
