import { style, styleVariants } from '@vtex/admin-ui-core'

export const variants = styleVariants({
  shape: {
    rect: {
      borderRadius: 'default',
    },
    circle: {
      borderRadius: 'circle',
    },
  },
})

export const baseline = style({
  display: 'inline-block',
  width: 'full',
  height: 'full',
  bg: '$skeleton',
  backgroundSize: `200px 100%`,
  backgroundRepeat: 'no-repeat',
  lineHeight: 1,
  borderRadius: 3,
})
