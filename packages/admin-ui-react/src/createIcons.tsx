import React, { createContext, useContext } from 'react'
import type { PropsWithChildren } from 'react'
import type { StyleProp } from '@vtex/admin-ui-core'
import type { IconProps } from '@vtex/phosphor-icons'
import { createIconProvider } from '@vtex/phosphor-icons'

import { useSystem } from './context'

function useIconProps(props: IconProps) {
  const { csx: containerCsx, size: containerSize } = useIconContainer()

  const {
    csx = {},
    title,
    size = containerSize,
    children,
    className,
    width,
    height,
    ...iconProps
  } = props

  const { cn, cx } = useSystem()

  const sizeValue = size === 'small' ? '1rem' : '1.25rem'

  return {
    width: width ?? sizeValue,
    height: height ?? sizeValue,
    ...iconProps,
    children: (
      <>
        {title ? <title>{title}</title> : null}
        {children}
      </>
    ),
    className: cx(
      className,
      cn({
        height: height ?? sizeValue,
        width: width ?? sizeValue,
        minHeight: height ?? sizeValue,
        minWidth: width ?? sizeValue,
        ...containerCsx,
        ...csx,
      })
    ),
  }
}

export const IconProvider = createIconProvider({ useIconProps })

export const IconContainerContext = createContext<IconContext>({
  size: 'regular',
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
    isRegular: size === 'regular',
  }
}

export type AvailableSize = 'regular' | 'small'
export interface IconContext {
  size: AvailableSize
  csx?: StyleProp
}

export type UseIconReturn = {
  size: AvailableSize
  csx: StyleProp
  isSmall: boolean
  isRegular: boolean
}
