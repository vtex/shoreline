import type { CSSPropAutocomplete, SpaceTokens } from '@vtex/admin-ui-core'
import { dataAttr, csx } from '@vtex/admin-ui-core'

export const stackTheme = (
  align: 'start' | 'end',
  space: CSSPropAutocomplete<SpaceTokens>
) =>
  csx({
    display: 'flex',
    [dataAttr('direction', 'column')]: {
      flexDirection: 'column',
      justifyContent: 'unset',
      alignItems: align,
      '> *:not(:first-child)': {
        marginTop: space,
      },
    },
    [dataAttr('direction', 'row')]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: align,
      '> *:not(:first-child)': {
        marginLeft: space,
      },
    },

    [dataAttr('fluid', 'true')]: {
      alignItems: 'unset',
      justifyContent: 'unset',
    },
  })
