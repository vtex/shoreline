import { keyframes, csx, dataAttr } from '@vtex/admin-ui-core'

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

export const skeletonTheme = csx({
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
    bottom: '$space-0',
    left: '$space-0',
    right: '$space-0',
    top: '$space-0',
  },
  [dataAttr('shape', 'rect')]: {
    borderRadius: '$base',
  },
  [dataAttr('shape', 'circle')]: {
    borderRadius: '$pill',
  },
})
