import React from 'react'
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
    csx = {},
    direction = 'up',
    title,
    size = 24,
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
        ...csx,
      })
    ),
  }
}

export const IconProvider = createIconProvider({ useIconProps })
