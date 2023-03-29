import { csx, dataAttr } from '@vtex/admin-ui-core'

export const labelTheme = csx({
  whiteSpace: 'nowrap',
  display: 'flex',
  justifyContent: 'flex-end',
  [dataAttr('size', 'small')]: { width: '6.5rem' },
  [dataAttr('size', 'medium')]: { width: '7.5rem' },
  [dataAttr('size', 'large')]: { width: '7.75rem' },
  [dataAttr('size', 'xlarge')]: { width: '8.25rem' },
})

export const loadingTheme = csx({ height: '1rem', width: '4.125rem' })
