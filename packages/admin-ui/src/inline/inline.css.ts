import type { SpaceTokens } from '@vtex/admin-ui-core'
import { theme, dataAttr, csx, getTokenValue } from '@vtex/admin-ui-core'
import type * as CSS from 'csstype'

function getRuntimeSpace(token: string) {
  return getTokenValue(theme, 'margin', token)
}

export const inlineStyle = (props: InlineStyleProps) =>
  ({
    '--v-space': getRuntimeSpace(props.vSpace),
    '--h-space': getRuntimeSpace(props.hSpace),
    '--align': props.align,
  } as React.CSSProperties)

export const inlineTheme = csx({
  display: 'flex',
  [dataAttr('wrap', true)]: {
    flexWrap: 'wrap',
  },
  [dataAttr('wrap', false)]: {
    flexWrap: 'nowrap',
  },
  alignItems: 'var(--align)',
  [dataAttr('space-inside', false)]: {
    '> *:not(:first-child)': {
      marginLeft: 'var(--h-space)',
      marginTop: 'var(--v-space)',
    },
    '> *:is(:first-child)': {
      marginLeft: 'var(--h-space)',
      marginTop: 'var(--v-space)',
    },
  },
  [dataAttr('space-inside', true)]: {
    '> *:not(:first-child)': {
      marginLeft: 'var(--h-space)',
      marginTop: '$space-0',
    },
    '> *:is(:first-child)': {
      marginLeft: '$space-0',
      marginTop: '$space-0',
    },
  },
})

interface InlineStyleProps {
  vSpace: SpaceTokens
  hSpace: SpaceTokens
  align: CSS.Properties['alignItems']
}
