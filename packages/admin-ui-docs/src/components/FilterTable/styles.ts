import type { StyleProp } from '@vtex/admin-ui-core'

const style: Record<string, StyleProp> = {}

style.dataView = {
  overflow: 'unset',
}

style.dataViewHeader = {
  position: 'sticky',
  top: '$space-0',
  zIndex: '5',
  background: '$primary',
}

style.table = {
  tr: {
    background: 'white !important',
  },
}
export default style
