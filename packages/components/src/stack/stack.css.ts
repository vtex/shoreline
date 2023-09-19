import { csx, dataAttr } from '@vtex/shoreline-vanilla-extract'

export const stackStyle = csx({
  display: 'flex',
  [dataAttr('direction', 'column')]: {
    flexDirection: 'column',
    justifyContent: 'unset',
    alignItems: 'var(--stack-align)',
    '> *:not(:first-child)': {
      marginTop: 'var(--sl-stack-space)',
    },
  },
  [dataAttr('direction', 'row')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'var(--stack-align)',
    '> *:not(:first-child)': {
      marginLeft: 'var(--sl-stack-space) !important',
    },
  },

  [dataAttr({ fluid: 'true', direction: 'column' })]: {
    alignItems: 'unset',
    justifyContent: 'unset',
  },
})
