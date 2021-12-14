import type { StyleProp } from '@vtex/admin-ui-core'

const style: Record<string, StyleProp> = {}

style.container = {
  position: 'relative',
}

style.overlay = {
  position: 'absolute',
  bottom: '0',
  height: '80%',
  width: '100%',
  background:
    'linear-gradient(0deg, rgba(247,247,247,1) 0%, rgba(247,247,247,.1) 50%)',
  zIndex: '1',
}

style.toggleCodeButton = {
  position: 'absolute',
  bottom: '8px',
  right: '8px',
  zIndex: '2',
}

export default style
