import { useSystem, createComponent, jsxs } from '@vtex/admin-core'
import { Icon, IconProps } from '@vtex/admin-ui-icons'
import { Primitive } from '../Primitive'

export const Spinner = createComponent(Icon, useSpinner)

export function useSpinner(props: SpinnerProps): IconProps {
  const { keyframes } = useSystem()

  const rotateContainer = keyframes`
    0% {
      transform: rotate(50deg);
      opacity: 0;
      stroke-dashoffset: 60;
    }
    100% {
      transform: rotate(230deg);
      opacity: 1;
      stroke-dashoffset: 50;
    }
  `
  const rotate = keyframes`
    100% {
      transform: rotate(360deg)
    }
  `

  return {
    focusable: 'false',
    viewBox: '0 0 16 16',
    xmlns: 'http://www.w3.org/2000/svg',
    styleOverrides: {
      verticalAlign: 'middle',
      opacity: 0,
      animation: `1s ease-in-out 0ms 1 normal forwards running ${rotateContainer}`,
      overflow: 'hidden',
    },
    children: jsxs(Primitive, {
      element: 'circle',
      cx: 8,
      cy: 8,
      r: 7,
      styles: {
        fill: 'none',
        stroke: 'blue',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeDasharray: '80',
        strokeDashoffset: 'inherit',
        transformOrigin: 'center center',
        animation: `0.86s cubic-bezier(0.4, 0.15, 0.6, 0.85) 0ms infinite normal none running ${rotate}`,
      },
    }),
    ...props,
  }
}

export type SpinnerProps = IconProps
