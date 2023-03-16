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
  display: 'inline-flex',
  [dataAttr('direction', 'column')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'unset',
    alignItems: 'var(--stack-align)',
  },
  [dataAttr('direction', 'row')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'var(--stack-align)',
  },

  [dataAttr({ fluid: 'true', direction: 'column' })]: {
    alignItems: 'unset',
    justifyContent: 'unset',
  },
})

export const stackChildTheme = csx({
  display: 'inline-flex',
  width: '100%',
  [dataAttr({ fluid: 'true', direction: 'column' })]: {
    flexDirection: 'column',
  },
  [dataAttr({ 'first-child': 'false', direction: 'column' })]: {
    marginTop: 'var(--stack-space)',
  },
  [dataAttr({ 'first-child': 'false', direction: 'row' })]: {
    marginLeft: 'var(--stack-space)',
  },
})
