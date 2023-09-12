import type { CSSPropAutocomplete, SpaceTokens } from '@vtex/admin-ui-core'
import { dataAttr, csx, getTokenValue, theme } from '@vtex/admin-ui-core'

export const stackStyle = (
  align: 'start' | 'end',
  space: CSSPropAutocomplete<SpaceTokens>
) => ({
  '--stack-space': getTokenValue(theme, 'margin', space),
  '--stack-align': align,
})

export const stackTheme = csx({
  display: 'flex',
  [dataAttr('direction', 'column')]: {
    flexDirection: 'column',
    justifyContent: 'unset',
    alignItems: 'var(--stack-align)',
    '> *:not(:first-child)': {
      marginTop: 'var(--stack-space) !important',
    },
  },
  [dataAttr('direction', 'row')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'var(--stack-align)',
    '> *:not(:first-child)': {
      marginLeft: 'var(--stack-space) !important',
    },
  },

  [dataAttr({ fluid: 'true', direction: 'column' })]: {
    alignItems: 'unset',
    justifyContent: 'unset',
  },
})
