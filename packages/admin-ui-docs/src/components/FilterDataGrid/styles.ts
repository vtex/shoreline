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

style.dataGrid = {
  tr: {
    background: 'white !important',
  },
}
export default style
