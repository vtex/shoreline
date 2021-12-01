import React, { createContext, useContext } from 'react'
import type { PropsWithChildren } from 'react'
import type { StyleProp } from '@vtex/admin-ui-core'
import type { IconProps } from '@vtex/phosphor-icons'
import { createIconProvider } from '@vtex/phosphor-icons'

import { useSystem } from './createSystem'

const directions = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
}

function useIconProps(props: IconProps) {
  const {
    csx: containerCsx,
    svgProps: { size: containerSize },
  } = useIconContainer()

  const {
    csx = {},
    direction = 'up',
    title,
    size = containerSize,
    children,
    className,
    ...iconProps
  } = props

  const { cn, cx } = useSystem()
  const rotationDeg = directions[direction]

  return {
    ...iconProps,
    size,
    children: (
      <>
        {title ? <title>{title}</title> : null}
        {children}
      </>
    ),
    className: cx(
      className,
      cn({
        size,
        minHeight: size,
        minWidth: size,
        transform: `rotate(${rotationDeg}deg)`,
        ...containerCsx,
        ...csx,
      })
    ),
  }
}

export const IconProvider = createIconProvider({ useIconProps })

export const IconContainerContext = createContext<IconContext>({
  space: 'regular',
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
  const { space, csx = {} } = useContext(IconContainerContext)

  const svgProps = {
    small: {
      size: 16,
    },
    regular: {
      size: 20,
    },
  }[space]

  return {
    space,
    csx,
    isSmall: space === 'small',
    isRegular: space === 'regular',
    svgProps,
  }
}

export type AvailableSpace = 'regular' | 'small'
export interface IconContext {
  space: AvailableSpace
  csx?: StyleProp
}

export type UseIconReturn = {
  space: AvailableSpace
  csx: StyleProp
  svgProps: {
    size: number
  }
  isSmall: boolean
  isRegular: boolean
}
