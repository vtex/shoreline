import type { CSSPropAutocomplete, SpaceTokens } from '@vtex/admin-ui-core'
import { style, styleVariants } from '@vtex/admin-ui-core'

export const columnsBaseline = (space: CSSPropAutocomplete<SpaceTokens>) =>
  style({
    display: 'flex',
    flexWrap: 'wrap',
    '> *:not(:first-child)': {
      paddingLeft: space,
    },
  })

export const columnVariants = styleVariants({
  offset: {
    left: {
      marginLeft: 'auto',
    },
    right: {
      marginRight: 'auto',
    },
    both: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    none: {},
  },
  units: {
    true: {
      flex: '0 0 auto',
    },
    false: {
      flex: '1 1 0%',
      maxWidth: '100%',
    },
  },
})

export const column = (units: number) =>
  style({ width: `${(Number(units) / 12) * 100}%` })
