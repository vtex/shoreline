import type { ReactNode } from 'react'
import React from 'react'
import { IconCaretDown, IconDotsThreeVertical } from '@vtex/phosphor-icons'
import { MenuButton as AriakitMenuButton } from 'ariakit'

import * as style from './menu.style'
import type { VariantProps } from '@vtex/admin-ui-core'
import {
  createComponent,
  IconContainer,
  useElement,
} from '@vtex/admin-ui-react'
import { Center } from '../center'

export const MenuButton = createComponent<
  typeof AriakitMenuButton,
  MenuButtonOptions
>((props) => {
  const {
    display = 'actions',
    variant = 'primary',
    size = 'normal',
    state,
    children,
    ...buttonProps
  } = props

  const isMenu = display === 'menu'
  const iconOnly = !children
  const iconPosition = isMenu ? 'end' : iconOnly ? 'center' : 'start'

  const icon = !isMenu ? <IconDotsThreeVertical /> : <IconCaretDown />

  const actionStyle = !isMenu
    ? style.actionsButtonSizeVariants({
        size,
      })
    : {}

  const menuStyle = isMenu
    ? style.menuButtonSizeVariants({
        size,
      })
    : {}

  return useElement(AriakitMenuButton, {
    ...buttonProps,
    baseStyle: {
      ...style.buttonStyle,
      ...style.colorVariants({
        variant,
      }),
      ...menuStyle,
      ...actionStyle,
    },
    state,
    children: (
      <Center
        csx={{
          ...style.innerContainerStyle,
          ...style.innerContainerVariants({
            iconPosition,
          }),
        }}
      >
        {icon && (
          <IconContainer size={iconPosition === 'end' ? 'small' : 'regular'}>
            {icon}
          </IconContainer>
        )}
        {children}
      </Center>
    ),
  })
})

export type MenuButtonOptions = VariantProps<typeof style.colorVariants> & {
  display?: 'menu' | 'actions'
  size?: 'normal' | 'large'
  children?: ReactNode
}

export type MenuButtonProps = React.ComponentPropsWithoutRef<typeof MenuButton>
