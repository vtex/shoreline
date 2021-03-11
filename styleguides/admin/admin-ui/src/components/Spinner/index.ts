import { useSystem, createComponent, jsxs, Colors } from '@vtex/admin-core'
import { Icon, IconProps } from '@vtex/admin-ui-icons'
import { SystemComponent } from '../../types'
import { Primitive } from '@vtex/admin-primitives'

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
  color?: Colors
}
