import type { StyleProp } from '@vtex/admin-ui-core'

const style: Record<string, StyleProp> = {}

style.input = {
  height: '2.5rem',
  paddingY: '0.4375rem',
  paddingLeft: '2rem',
  paddingRight: '2.5rem',
  margin: 0,
}

style.icon = {
  top: 0,
  margin: '0.625rem 0.25rem 0 0.5rem',
}

style.spinner = {
  ...style.icon,
  position: 'absolute',
}

style.search = {
  ...style.icon,
  color: 'base',
}

style.clearButton = {
  position: 'absolute',
  top: 0,
  right: 0,
  marginRight: '0.375rem',
}

export default style
