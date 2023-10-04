import { csx } from '@vtex/admin-ui'

export const iconsGridStyle = csx({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
})

export const iconsCardStyle = csx({
  display: 'flex',
  paddingY: '1.5rem',
  paddingX: '1rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  svg: {
    marginBottom: '1rem',
  },
})

export const iconDescriptionStyle = csx({
  fontWeight: 400,
  fontSize: '0.75em',
  textAlign: 'center',
  color: '#6C727F',
})

export const iconNameStyle = csx({
  color: 'var(--sl-fg-muted)',
  fontWeight: 500,
  textAlign: 'center',
})
