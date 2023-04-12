import React, { createContext, useContext } from 'react'
import type { PropsWithChildren } from 'react'
import { csx, cx } from '@vtex/admin-ui-core'
import type { IconProps } from '@vtex/phosphor-icons'
import { createIconProvider } from '@vtex/phosphor-icons'

function useIconProps(props: IconProps) {
  const { className: containerClassName = '', size: containerSize } =
    useIconContainer()

  const {
    title,
    size = containerSize,
    children,
    className = '',
    width,
    height,
    ...iconProps
  } = props

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
      csx({
        height: height ?? sizeValue,
        width: width ?? sizeValue,
        minHeight: height ?? sizeValue,
        minWidth: width ?? sizeValue,
      }),
      className,
      containerClassName
    ),
  }
}

export const IconProvider = createIconProvider({
  useIconProps,
})

export const IconContainerContext = createContext<IconContext>({
  size: 'regular',
  className: '',
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
  const { size, className } = useContext(IconContainerContext)

  return {
    size,
    className,
    isSmall: size === 'small',
    isRegular: size === 'regular',
  }
}

export type AvailableSize = 'regular' | 'small'

export interface IconContext {
  size: AvailableSize
  className?: string
}

export type UseIconReturn = {
  size: AvailableSize
  isSmall: boolean
  isRegular: boolean
  className?: string
}
