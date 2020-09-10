import React from 'react'
import { Icon, IconProps } from '@vtex-components/icon'

const directions = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
}

export function IconCaret(props: IconWithDirectionProps) {
  const { direction = 'up', ...iconProps } = props

  const rotationDeg = directions[direction]

  return (
    <Icon
      {...iconProps}
      sx={{
        transform: `rotate(${rotationDeg}deg)`,
      }}
    >
      <path
        d="M16 14L12 10L8 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export interface IconWithDirectionProps extends IconProps {
  /**
   * Icon direction
   * @default 'up'
   */
  direction?: 'up' | 'right' | 'down' | 'left'
}
