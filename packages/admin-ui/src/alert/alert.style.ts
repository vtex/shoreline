import { style, styleVariants } from '@vtex/admin-ui-core'

export const baseline = style({
  text: '$detail',
  color: '$primary',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '3.25rem',
  height: '100%',
  paddingY: 2,
  paddingX: 4,
  borderRadius: 'default',
  zIndex: 999,
  transition: 'pop',
})

export const action = style({
  text: '$detail',
  color: '$action.neutral.tertiary',
})

export const variants = styleVariants({
  visible: {
    true: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      visibility: 'visible',
    },
    false: {
      opacity: 0,
      transform: 'translate3d(0, -10px, 0)',
      visibility: 'hidden',
    },
  },
  tone: {
    critical: {
      bg: '$critical',
      border: '$critical',
    },
    positive: {
      bg: '$positive',
      border: '$positive',
    },
    warning: {
      bg: '$warning',
      border: '$warning',
    },
    info: {
      bg: '$info',
      border: '$info',
    },
  },
})
