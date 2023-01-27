import { csx } from '@vtex/admin-ui-core'
import { variant } from '../../modal/util'

// export const variants = styleVariants({
//   orientation: {
//     horizontal: {
//       borderBottom: 0,
//     },
//     vertical: {
//       borderLeft: 0,
//       height: 'auto',
//     },
//   },
// })

// export const baseline = style({
//   border: '$neutral',
//   margin: '$space-0',
// })

export const dividerTheme = csx({
  border: '$neutral',
  margin: '$space-0',
  ...variant('orientation', 'horizontal', {
    borderBottom: 0,
  }),
  ...variant('orientation', 'vertical', {
    borderLeft: 0,
    height: 'auto',
  }),
})
