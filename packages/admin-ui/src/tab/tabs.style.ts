import { style, focusVisible } from '@vtex/admin-ui-core'

const tabBorderBottomWidth = '0.1875rem'

export const tabList = style({
  width: '$full',
  display: 'inline-block',
})

export const tab = style({
  text: '$action1',
  paddingX: '$l',
  paddingY: '$xl',
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
  padding: '$s',
  ...focusVisible('neutral'),
})
