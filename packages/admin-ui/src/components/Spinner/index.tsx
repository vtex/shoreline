import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { keyframes } from '@vtex/admin-ui-core'
import { Box } from '../../box'

export const Spinner = createComponent<'svg', SpinnerOptions>((props) => {
  const { size = 24, ...restProps } = props

  const dash = keyframes({
    '0%': {
      strokeDasharray: '1, 150',
      strokeDashoffset: '0',
    },
    '50%': {
      strokeDasharray: '90, 150',
      strokeDashoffset: '-35',
    },
    '100%': {
      strokeDasharray: '90, 150',
      strokeDashoffset: '-124',
    },
  })

  const rotate = keyframes({
    '100%': {
      transform: 'rotate(360deg)',
    },
  })

  const svgProps = { viewBox: '0 0 50 50', focusable: 'false' }

  return useElement('svg', {
    baseStyle: {
      animation: `${rotate} 1.5s linear infinite`,
      size,
    },
    ...svgProps,
    children: (
      <Box
        as="circle"
        cx={25}
        cy={25}
        r={20}
        csx={{
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 5,
          strokeLinecap: 'round',
          animation: `${dash} 1s ease-in-out infinite`,
        }}
      />
    ),
    ...restProps,
  })
})

interface SpinnerOptions {
  size?: number
}

export type SpinnerProps = ComponentPropsWithRef<typeof Spinner> &
  SpinnerOptions
