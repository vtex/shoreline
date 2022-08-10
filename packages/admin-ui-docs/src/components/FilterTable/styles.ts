import type { StyleProp } from '@vtex/admin-ui-core'

const style: Record<string, StyleProp> = {}

style.dataView = {
  overflow: 'unset',
}

style.dataViewControls = {
  position: 'sticky',
  top: 0,
  zIndex: '5',
  background: '$primary',
}

style.table = {
  tr: {
    background: 'white !important',
  },
}
export default style
