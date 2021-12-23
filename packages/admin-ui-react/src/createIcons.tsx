import React, { createContext, useContext } from 'react'
import type { PropsWithChildren } from 'react'
import type { StyleProp } from '@vtex/admin-ui-core'
import type { IconProps } from '@vtex/phosphor-icons'
import { createIconProvider } from '@vtex/phosphor-icons'

import { useSystem } from './createSystem'

function useIconProps(props: IconProps) {
  const { csx: containerCsx, size: containerSize } = useIconContainer()

  const {
    csx = {},
    title,
    size = containerSize,
    children,
    className,
    ...iconProps
  } = props

  const { cn, cx } = useSystem()

  const sizeValue = size === 'small' ? '1rem' : '1.25rem'

  return {
    ...iconProps,
    width: sizeValue,
    height: sizeValue,
    children: (
      <>
        {title ? <title>{title}</title> : null}
        {children}
      </>
    ),
    className: cx(
      className,
      cn({
        size: sizeValue,
        minHeight: sizeValue,
        minWidth: sizeValue,
        ...containerCsx,
        ...csx,
      })
    ),
  }
}

export const IconProvider = createIconProvider({ useIconProps })

export const IconContainerContext = createContext<IconContext>({
  size: 'normal',
})

export function IconContainer(props: PropsWithChildren<IconContext>) {
  const { children, ...value } = props

  return (
    <IconContainerContext.Provider value={value}>
      {children}
    </IconContainerContext.Provider>
  )
}

export function useIconContainer(): UseIconReturn {
  const { size, csx = {} } = useContext(IconContainerContext)

  return {
    size,
    csx,
    isSmall: size === 'small',
    isNormal: size === 'normal',
  }
}

export type AvailableSize = 'normal' | 'small'
export interface IconContext {
  size: AvailableSize
  csx?: StyleProp
}

export type UseIconReturn = {
  size: AvailableSize
  csx: StyleProp
  isSmall: boolean
  isNormal: boolean
}
