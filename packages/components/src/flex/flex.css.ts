import { csx } from '@vtex/shoreline-vanilla-extract'

export const flexStyle = csx({
  display: 'flex',
  order: 'var(--sl-flex-order)',
  flexDirection: 'var(--sl-flex-direction)',
  flexGrow: 'var(--sl-flex-grow)',
  flexWrap: 'var(--sl-flex-wrap)',
  flexShrink: 'var(--sl-flex-shrink)',
  flexBasis: 'var(--sl-flex-basis)',
  justifyContent: 'var(--sl-flex-justify)',
  alignItems: 'var(--sl-flex-align)',
  gap: 'var(--sl-flex-gap)',
  rowGap: 'var(--sl-flex-rowGap)',
  columnGap: 'var(--sl-flex-columnGap)',
})
