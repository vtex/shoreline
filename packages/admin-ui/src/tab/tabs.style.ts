import { style, focusVisible } from '@vtex/admin-ui-core'

export const tabList = style({
  width: 'full',
  display: 'inline-block',
})

export const tab = style({
  text: '$action1',
  paddingX: '$l',
  paddingY: '$xl',
  borderBottomStyle: 'solid',
  borderBottomColor: 'transparent',
  borderBottomWidth: '0.1875rem',
  height: '3rem',
  cursor: 'pointer',
  position: 'relative',
  bg: '$primary',
  color: '$primary',
  ':hover': {
    color: '$action.main.tertiaryHover',
  },
  '&[aria-selected="true"]': {
    borderBottom: '$mainSelected',
    color: '$action.main.tertiarySelected',
  },
  ...focusVisible('main'),
})

export const tabPanel = style({
  ...focusVisible('neutral'),
})
