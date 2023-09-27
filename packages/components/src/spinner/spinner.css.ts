import { csx, keyframes } from '@vtex/shoreline-vanilla-extract'

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

export const spinnerStyle = csx({
  '@layer': {
    components: {
      '&[data-sl-spinner]': {
        '> svg': {
          animation: `${rotateAnimation} 1.5s linear infinite`,
          '> circle': {
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 5,
            strokeLinecap: 'round',
            animation: `${dashAnimation} 1s ease-in-out infinite`,
          },
        },
      },
    },
  },
})
