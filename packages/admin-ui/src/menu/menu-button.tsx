import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { MenuButton as AriakitMenuButton } from 'ariakit'
import {
  IconCaretUp,
  IconCaretDown,
  IconDotsThreeVertical,
} from '@vtex/phosphor-icons'
import type { AvailableSize } from '@vtex/admin-ui-react'
import { IconContainer } from '@vtex/admin-ui-react'

import { Center } from '../center'

import { buttonInnerContainerTheme, buttonTheme } from './menu.css'

import { useMessageFormatter } from '../i18n'
import { messages } from './messages'
import type { MenuState } from './menu.state'

export const MenuButton = forwardRef(
  (props: MenuButtonProps, ref: Ref<HTMLButtonElement>) => {
    const {
      variant = 'primary',
      size = 'normal',
      state,
      label,
      labelHidden,
      bleedY,
      bleedX,
      ...buttonProps
    } = props

    const isCustomMenu = !!(label && !labelHidden)
    const menuType = isCustomMenu ? 'custom' : 'default'
    const iconConfig: IconConfig = {
      default: {
        icon: <IconDotsThreeVertical />,
        position: labelHidden ? 'center' : 'start',
        size: 'regular',
      },
      custom: {
        icon: state.open ? <IconCaretUp /> : <IconCaretDown />,
        position: 'end',
        size: 'small',
      },
    }[menuType] as IconConfig

    const formatMessage = useMessageFormatter(messages)
    const menuLabel = (label ?? formatMessage('buttonLabel')) as string

    return (
      <AriakitMenuButton
        aria-label={menuLabel}
        state={state}
        ref={ref}
        {...buttonProps}
        data-size={size}
        data-bleed-x={bleedX}
        data-bleed-y={bleedY}
        data-custom={isCustomMenu}
        data-variant={variant}
        data-open={state.open}
        className={buttonTheme}
      >
        <Center
          data-icon-position={iconConfig.position}
          className={buttonInnerContainerTheme}
        >
          <IconContainer size={iconConfig.size}>
            {iconConfig.icon}
          </IconContainer>
          {!labelHidden && menuLabel}
        </Center>
      </AriakitMenuButton>
    )
  }
)

type IconConfig = {
  icon: ReactNode
  position: 'start' | 'center' | 'end'
  size: AvailableSize
}

type MenuButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'neutralTertiary'

export interface MenuButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: MenuButtonVariant
  /**
   * Button size
   * @default normal
   */
  size?: 'normal' | 'large'
  /**
   * Button label
   */
  label?: ReactNode
  /**
   * Whether the label is visible
   * @default false
   */
  labelHidden?: boolean
  /**
   * Vertical bleed
   */
  bleedY?: boolean
  /**
   * Horizontal bleed
   */
  bleedX?: boolean
  /**
   * Button click event
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  state: MenuState
}
