import { csx, keyframes } from '@vtex/admin-ui-core'

const dashAnimation = keyframes({
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

const rotateAnimation = keyframes({
  '100%': {
    transform: 'rotate(360deg)',
  },
})

export const svgTheme = csx({
  animation: `${rotateAnimation} 1.5s linear infinite`,
})

export const spinnerTheme = csx({
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 5,
  strokeLinecap: 'round',
  animation: `${dashAnimation} 1s ease-in-out infinite`,
})
