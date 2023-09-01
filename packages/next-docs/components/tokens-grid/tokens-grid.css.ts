import { csx, dataAttr } from '@vtex/admin-ui'

export const cellTheme = csx({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  borderBottom: '$neutral',
  padding: '$space-4',
  fontWeight: 400,
  fontSize: '0.8750em',
})

export const previewCellTheme = csx({
  [dataAttr('foundation', 'color')]: {
    bg: 'var(--preview-cell-token-value)',
    size: '48px',
    borderRadius: '0.5rem',
  },
  [dataAttr('foundation', 'border')]: {
    border: 'var(--preview-cell-token-value)',
    size: '48px',
    borderRadius: '0.5rem',
    bg: 'transparent',
  },
  [dataAttr('foundation', 'radii')]: {
    borderRadius: 'var(--preview-cell-token-value)',
    size: '48px',
    bg: '#DEDEDE',
  },
  [dataAttr('foundation', 'spacing')]: {
    height: '48px',
    width: 'var(--preview-cell-token-value)',
    bg: '#DEDEDE',
  },
  fontWeight: 400,
  fontSize: '0.7500em',
})

export const tokenTheme = csx({
  bg: '#F7F7F7',
  border: '1px solid #EDEDED',
  fontWeight: 400,
  fontSize: '0.8750em',
  borderRadius: '6px',
  paddingX: '4px',
  marginRight: '4px',
})

export const copyButtonTheme = csx({
  padding: '4px',
  bg: 'transparent',
  borderRadius: '4px',
  ':hover': { bg: 'rgba(0, 0, 0, 0.05)' },
  ':active': { bg: 'rgba(0, 0, 0, 0.1)' },
})

export const headTheme = csx({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  borderBottom: '$neutral',
  paddingX: '$space-4',
  paddingY: '$space-2',
  fontWeight: 600,
  fontSize: '0.8750em',
})
