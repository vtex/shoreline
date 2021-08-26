import type { Colors } from '@vtex/onda-core'
import { useSystem } from '@vtex/onda-core'
import { createComponent, jsxs } from '@vtex/admin-jsxs'
import type { IconProps } from '@vtex/admin-ui-icons'
import { Icon } from '@vtex/admin-ui-icons'
import { Primitive } from '@vtex/admin-primitives'

import type { SystemComponent } from '../../types'

export const Spinner = createComponent(Icon, useSpinner)

export function useSpinner(props: SpinnerProps): IconProps {
  const { csx, color = 'blue', ...spinnerProps } = props
  const { keyframes } = useSystem()

  const dash = keyframes`
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  `

  const rotate = keyframes`
    100% {
      transform: rotate(360deg)
    }
  `

  return {
    focusable: 'false',
    viewBox: '0 0 50 50',
    csx: {
      animation: `${rotate} 1.5s linear infinite`,
      ...csx,
    },
    children: jsxs(Primitive, {
      element: 'circle',
      cx: 25,
      cy: 25,
      r: 20,
      csx: {
        fill: 'none',
        stroke: color,
        strokeWidth: 5,
        strokeLinecap: 'round',
        animation: `${dash} 1s ease-in-out infinite`,
      },
    }),
    ...spinnerProps,
  }
}

export interface SpinnerProps extends Pick<IconProps, 'size'>, SystemComponent {
  color?: Colors | 'currentColor'
}
