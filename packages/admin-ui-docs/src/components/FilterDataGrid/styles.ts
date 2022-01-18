import type { StyleProp } from '@vtex/admin-ui-core'

const style: Record<string, StyleProp> = {}

style.dataView = {
  overflow: 'unset',
}

style.dataViewControls = {
  position: 'sticky',
  top: 0,
  zIndex: '1000',
  background: '$primary',
}

style.dropdown = {
  color: '$action.neutral.tertiary',
  background: '$action.neutral.tertiary',
  ':hover': {
    color: '$action.neutral.tertiaryHover',
    background: '$action.neutral.tertiaryHover',
  },
  ':active': {
    color: '$action.neutral.tertiaryPressed',
    background: '$action.neutral.tertiaryPressed',
  },
}

style.dataGrid = {
  tr: {
    background: 'white !important',
  },
}
export default style
