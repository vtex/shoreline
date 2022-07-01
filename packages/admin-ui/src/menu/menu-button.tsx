import type { ReactNode } from 'react'
import React from 'react'
import { MenuButton as AriakitMenuButton } from 'ariakit'
import {
  IconCaretUp,
  IconCaretDown,
  IconDotsThreeVertical,
} from '@vtex/phosphor-icons'
import type { StyleProp, VariantProps } from '@vtex/admin-ui-core'
import type { AvailableSize } from '@vtex/admin-ui-react'
import {
  createComponent,
  IconContainer,
  useElement,
} from '@vtex/admin-ui-react'

import { Center } from '../center'

import * as style from './menu.style'

import { useMessageFormatter } from '../i18n'
import { messages } from './menu.i18n'

export const MenuButton = createComponent<
  typeof AriakitMenuButton,
  MenuButtonOptions
>((props) => {
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

  const buttonColorVariants = style.buttonColorVariants({
    variant,
  })

  const colorVariantsStyle = state.visible
    ? buttonColorVariants[':active' as keyof StyleProp]
    : buttonColorVariants

  const isCustomMenu = label && !labelHidden
  const menuStyle = isCustomMenu
    ? style.customMenuButtonSizeVariants({
        size,
      })
    : style.defaultMenuButtonSizeVariants({
        size,
      })

  const menuType = isCustomMenu ? 'custom' : 'default'
  const iconConfig: IconConfig = {
    default: {
      icon: <IconDotsThreeVertical />,
      position: labelHidden ? 'center' : 'start',
      size: 'regular',
    },
    custom: {
      icon: state.visible ? <IconCaretUp /> : <IconCaretDown />,
      position: 'end',
      size: 'small',
    },
  }[menuType] as IconConfig

  const formatMessage = useMessageFormatter(messages.menu)
  const menuLabel = label ?? formatMessage('buttonLabel')

  const bleedYStyle = bleedY
    ? style.bleedY({
        size,
      })
    : {}

  const bleedXStyle = bleedX
    ? style.bleedX({
        size,
      })
    : {}

  return useElement(AriakitMenuButton, {
    'aria-label': menuLabel,
    ...buttonProps,
    baseStyle: {
      ...style.buttonStyle,
      ...colorVariantsStyle,
      ...menuStyle,
      ...bleedYStyle,
      ...bleedXStyle,
    },
    state,
    children: (
      <Center
        csx={{
          ...style.buttonInnerContainerStyle,
          ...style.buttonInnerContainerVariants({
            iconPosition: iconConfig.position,
          }),
        }}
      >
        <IconContainer size={iconConfig.size}>{iconConfig.icon}</IconContainer>
        {!labelHidden && menuLabel}
      </Center>
    ),
  })
})

type IconConfig = {
  icon: ReactNode
  position: 'start' | 'center' | 'end'
  size: AvailableSize
}

export type MenuButtonOptions = VariantProps<
  typeof style.buttonColorVariants
> & {
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
}

export type MenuButtonProps = React.ComponentPropsWithoutRef<typeof MenuButton>
