import { csx, focusVisible } from '@vtex/admin-ui-core'

const tabBorderBottomWidth = '0.1875rem'

export const tabListTheme = csx({
  width: 'full',
  display: 'inline-block',
})

export const tabTheme = csx({
  text: '$action1',
  paddingX: '$space-3',
  paddingY: '$space-4',
  borderBottomStyle: 'solid',
  borderBottomColor: 'transparent',
  borderBottomWidth: tabBorderBottomWidth,
  height: '3rem',
  cursor: 'pointer',
  position: 'relative',
  bg: '$primary',
  color: '$action.neutral.tertiary',
  ':hover': {
    color: '$action.neutral.tertiaryHover',
    borderBottom: '$neutral',
    borderBottomWidth: tabBorderBottomWidth,
  },
  '&[aria-selected="true"]': {
    color: '$action.main.tertiarySelected',
    borderBottom: '$mainSelected',
    borderBottomWidth: tabBorderBottomWidth,
  },
  '&[aria-disabled="true"]': {
    cursor: 'not-allowed',
    borderBottom: 'none',
    fg: '$disabled',
  },
  ...focusVisible('main'),
})

export const tabPanelTheme = csx({
  padding: '$space-2 $space-3',
  ...focusVisible('neutral'),
})