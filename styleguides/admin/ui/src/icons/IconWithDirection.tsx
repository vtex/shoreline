import React, { Ref } from 'react'
import { Icon, IconProps } from '@vtex-components/icon'
import { forwardRef } from '@vtex-components/utils'

const directions = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
}

export const IconWithDirection = forwardRef(
  (props: IconWithDirectionProps, ref: Ref<SVGSVGElement>) => {
    const { direction = 'up', ...iconProps } = props

    const rotationDeg = directions[direction]

    return (
      <Icon
        {...iconProps}
        ref={ref}
        sx={{
          transform: `rotate(${rotationDeg}deg)`,
        }}
      />
    )
  }
)

export interface IconWithDirectionProps extends IconProps {
  /**
   * Icon direction
   * @default 'up'
   */
  direction?: 'up' | 'right' | 'down' | 'left'
}
