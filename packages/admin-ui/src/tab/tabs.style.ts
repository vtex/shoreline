import { style, focusVisible } from '@vtex/admin-ui-core'

const tabBorderBottomWidth = '0.1875rem'

export const tabList = style({
  width: 'full',
  display: 'inline-block',
})

export const tab = style({
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
  ...focusVisible('main'),
})

export const tabPanel = style({
  padding: '$space-2 $space-3',
  ...focusVisible('neutral'),
})
