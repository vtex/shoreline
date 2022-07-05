import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import { jsx, tag } from '@vtex/admin-ui-react'
import { keyframes } from '@vtex/admin-ui-core'

export const Spinner = jsx('svg')(
  {},
  {
    options: ['color', 'size'],
    useOptions(options: SpinnerOptions, props, system) {
      const { size = 24 } = options
      const { csx } = props

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

      return {
        ...props,
        csx: {
          animation: `${rotate} 1.5s linear infinite`,
          size,
          ...csx,
        },
        children: (
          <tag.circle
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
      }
    },
  }
)

interface SpinnerOptions {
  size?: number
}

Spinner.defaultProps = {
  focusable: 'false',
  viewBox: '0 0 50 50',
}

export type SpinnerProps = ComponentPropsWithRef<typeof Spinner> &
  SpinnerOptions
