import { csx, dataAttr } from '@vtex/admin-ui'

export const sidebar = csx({
  bg: '$secondary',
  height: '100%',
  padding: '$space-5 $space-3 $space-0',
  overflowX: 'hidden',
  overflowY: 'auto',
})

export const sidebarSection = csx({
  width: '100%',
})

export const sidebarSectionButton = csx({
  cursor: 'pointer',
  padding: '$space-2',
  text: '$action1',
  display: 'grid',
  gridTemplateColumns: '1.25em 1fr 20px',
  gap: '$space-5',
  placeItems: 'flex-start',
  bg: '$action.neutral.tertiary',
  color: '$action.neutral.tertiary',
  '> .sidebar-section-caret': {
    color: '$disabled',
    // display: 'none', //apply for hiding feature
  },
  ':hover': {
    color: '$action.neutral.tertiaryHover',
    '> .sidebar-section-caret': {
      color: '$action.neutral.tertiaryHover',
      // display: 'initial', //apply for hiding feature
    },
  },
  [dataAttr('active', true)]: {
    color: '$action.neutral.tertiaryPressed',
    '> .sidebar-section-caret': {
      color: '$action.neutral.tertiaryPressed',
    },
  },
})

export const sidebarSectionDivider = csx({
  marginY: '$space-3',
})

export const sidebarGroupTitle = csx({
  padding: '$space-7 $space-0 $space-3 $space-10',
  text: '$body',
  fg: '$secondary',
  textTransform: 'uppercase',
  fontSize: '12px',
})

export const sidebarLink = csx({
  borderRadius: '$base',
  text: '$body',
  textDecoration: 'none',
  padding: '$space-2 $space-10',
  bg: '$action.neutral.tertiary',
  color: '$action.neutral.tertiary',
  ':hover': {
    bg: '$action.neutral.tertiaryHover',
    color: '$action.neutral.tertiaryHover',
  },
  [dataAttr('active', true)]: {
    bg: '$action.main.tertiaryPressed',
    color: '$action.main.tertiaryPressed',
  },
})
