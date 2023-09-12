import type { CSSPropAutocomplete, SpaceTokens } from '@vtex/admin-ui-core'
import { dataAttr, style, csx, theme, getTokenValue } from '@vtex/admin-ui-core'

export const columnsStyle = (space: CSSPropAutocomplete<SpaceTokens>) =>
  style({
    '--columns-space': getTokenValue(theme, 'padding', space),
  })

export const columnsTheme = csx({
  display: 'flex',
  flexWrap: 'wrap',
  '> *:not(:first-child)': {
    paddingLeft: 'var(--columns-space)',
  },
})

export const columnStyle = (units?: number) =>
  style({
    '--column-width': units ? `${(Number(units) / 12) * 100}%` : 'auto',
  })

export const columnTheme = csx({
  width: 'var(--column-width)',
  [dataAttr('offset', 'left')]: { marginLeft: 'auto' },
  [dataAttr('offset', 'right')]: { marginRight: 'auto' },
  [dataAttr('offset', 'both')]: { marginLeft: 'auto', marginRight: 'auto' },

  [dataAttr('units', 'true')]: { flex: '0 0 auto' },
  [dataAttr('units', 'false')]: { flex: '1 1 0%', maxWidth: '100%' },
})
