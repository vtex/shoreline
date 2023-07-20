import { csx, dataAttr } from '@vtex/admin-ui'

export const sidebar = csx({
  bg: '$secondary',
  height: '100%',
  padding: '$space-3',
  overflowX: 'hidden',
  overflowY: 'auto',
})

export const sidebarSection = csx({
  width: '100%',
})

export const sidebarSectionButton = csx({
  cursor: 'pointer',
  borderRadius: 'var(--radii)',
  padding: '$space-3',
  text: '$body',
  display: 'grid',
  gridTemplateColumns: '1.25em 1fr',
  gap: '$space-5',
  placeItems: 'flex-start',
  bg: '$action.neutral.tertiary',
  color: '$action.neutral.tertiary',
  ':hover': {
    color: '$action.neutral.tertiaryHover',
  },
  ':active': {
    color: 'black',
  },
})

export const sidebarSectionDivider = csx({
  marginY: '$space-3',
})

export const sidebarGroup = csx({
  [dataAttr('has-title', true)]: {
    marginTop: '$space-5',
  },
})

export const sidebarGroupTitle = csx({
  padding: '$space-0 $space-0 $space-1 $space-10',
  text: '$body',
  fg: '$secondary',
  textTransform: 'uppercase',
  fontSize: '12px',
})

export const sidebarLink = csx({
  borderRadius: 'var(--radii)',
  text: '$body',
  textDecoration: 'none',
  padding: '$space-2 $space-10',
  bg: '$action.neutral.tertiary',
  color: '$action.neutral.tertiary',
  ':hover': {
    bg: '$action.neutral.tertiaryHover',
    color: '$action.neutral.tertiaryHover',
  },
  ':active': {
    bg: '$action.neutral.tertiaryPressed',
    color: '$action.neutral.tertiaryPressed',
  },
})
