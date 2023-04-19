import { csx } from '@vtex/admin-ui-core'

export const cardTheme = csx({
  bg: '$primary',
  color: '$primary',
  border: '$neutral',
  borderRadius: '$base',
  size: '100%',
  boxSizing: 'border-box',
})

export const titleTheme = csx({
  text: '$title1',
})

export const imageTheme = csx({
  absoluteSize: '1.25rem',
})

export const headerTheme = csx({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$space-6 $space-7',
  width: '100%',
})

export const contentTheme = csx({
  '.__admin-ui-card-nested-title': { text: '$title2' },
  padding: '$space-0 $space-7 $space-6',
  size: '100%',
})
