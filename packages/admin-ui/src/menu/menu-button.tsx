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
    ...buttonProps
  } = props

  const colorVariants = style.colorVariants({
    variant,
  })

  const colorVariantsStyle = state.visible
    ? colorVariants[':active' as keyof StyleProp]
    : colorVariants

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

  return useElement(AriakitMenuButton, {
    'aria-label': menuLabel,
    ...buttonProps,
    baseStyle: {
      ...style.buttonStyle,
      ...colorVariantsStyle,
      ...menuStyle,
    },
    state,
    children: (
      <Center
        csx={{
          ...style.innerContainerStyle,
          ...style.innerContainerVariants({
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

export type MenuButtonOptions = VariantProps<typeof style.colorVariants> & {
  size?: 'normal' | 'large'
  label?: string
  labelHidden?: boolean
}

export type MenuButtonProps = React.ComponentPropsWithoutRef<typeof MenuButton>
