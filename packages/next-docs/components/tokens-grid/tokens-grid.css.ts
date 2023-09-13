import { csx, dataAttr } from '@vtex/admin-ui'

export const gridTheme = csx({
  display: 'grid',
  gridTemplateColumns: '2fr 2fr 2fr 5rem',
  [dataAttr('foundation', 'breakpoint')]: {
    gridTemplateColumns: '2fr 2fr 1fr',
  },
  [dataAttr('foundation', 'elevation')]: {
    gridTemplateColumns: '2fr 2fr 3fr 5rem',
  },
  [dataAttr('foundation', 'space')]: {
    gridTemplateColumns: '2fr 2fr 1fr 1fr',
  },
  [dataAttr('foundation', 'border-radius')]: {
    gridTemplateColumns: '2fr 2fr 1fr 5rem',
  },
})

export const cellTheme = csx({
  [dataAttr('type', 'preview')]: {
    paddingRight: '$space-0',
  },
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
  [dataAttr('foundation', 'border-radius')]: {
    borderRadius: 'var(--preview-cell-token-value)',
    size: '48px',
    bg: '#DEDEDE',
  },
  [dataAttr('foundation', 'space')]: {
    height: '48px',
    width: 'var(--preview-cell-token-value)',
    bg: '#DEDEDE',
    borderRadius: '0',
  },
  [dataAttr('foundation', 'letter-spacing')]: {
    height: '48px',
    letterSpacing: 'var(--preview-cell-token-value)',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    ':after': {
      content: 'Aa',
    },
  },
  [dataAttr('foundation', 'font-size')]: {
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    fontSize: 'var(--preview-cell-token-value)',
    ':after': {
      content: 'Aa',
    },
  },
  [dataAttr('foundation', 'font-weight')]: {
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 'var(--preview-cell-token-value)',
    ':after': {
      content: 'Aa',
    },
  },
  [dataAttr('foundation', 'shadow')]: {
    size: '48px',
    display: 'flex',
    boxShadow: 'var(--preview-cell-token-value)',
  },
  [dataAttr('foundation', 'focus-ring')]: {
    size: '48px',
    display: 'flex',
    boxShadow: 'var(--preview-cell-token-value)',
  },
  [dataAttr('foundation', 'text')]: {
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    font: 'var(--preview-cell-text-font)',
    letterSpacing: 'var(--preview-cell-text-letter-spacing)',
    ':after': {
      content: 'Aa',
    },
  },
  borderRadius: '0.5rem',
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
