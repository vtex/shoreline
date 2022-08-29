import { keyframes, style, styleVariants } from '@vtex/admin-ui-core'

export const variants = styleVariants({
  shape: {
    rect: {
      borderRadius: '$default',
    },
    circle: {
      borderRadius: '$circle',
    },
  },
})

const waveKeyframe = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
  },
  '50%': {
    transform: 'translateX(100%)',
  },
  '100%': {
    transform: 'translateX(100%)',
  },
})

export const baseline = style({
  display: 'block',
  position: 'relative',
  size: '100%',
  bg: `$secondary`,
  overflow: 'hidden',
  '&::after': {
    animation: `${waveKeyframe} 1.6s linear 0.5s infinite`,
    bg: '$skeleton',
    content: '',
    position: 'absolute',
    transform: 'translateX(-100%)',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
})
