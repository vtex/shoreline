import { SxStyleProp } from 'theme-ui'
import { rgba } from 'polished'

import colors from '../colors'

const surface = {
  outline: 'none',
  bg: 'background',
  borderRadius: 3,
  borderColor: 'muted.3',
  borderStyle: 'solid',
  borderWidth: 1,
  position: 'relative',
  overflowY: 'auto',
  overflowX: 'hidden',
  maxHeight: '3/4',
}

const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderColor: 'muted.3',
  borderStyle: 'solid',
  'button + button': {
    ml: 4,
  },
  py: 4,
  px: 6,
  borderTopWidth: 0,
  borderLeftWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 1,
  h1: {
    variant: 'text.subtitle',
    lineHeight: 0,
  },
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  bg: 'background',
  zIndex: 999,
}

const footer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderColor: 'muted.3',
  borderStyle: 'solid',
  'button + button': {
    ml: 4,
  },
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  borderRightWidth: 0,
  position: 'sticky',
  bottom: 0,
  left: 0,
  right: 0,
  bg: 'background',
  p: 6,
}

export default {
  backdrop: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: rgba(colors.text, 0.5),
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  'surface-small': { ...surface, width: 320 },
  'surface-regular': { ...surface, width: ['full', 'full', 560] },
  'surface-large': { ...surface, width: ['full', 'full', 800] },
  'header-small': { ...header, height: '3.5rem' },
  'header-regular': { ...header, height: '3.5rem' },
  'header-large': { ...header, height: '5rem' },
  content: {
    pt: 4,
    px: 6,
    pb: 6,
  },
  'footer-small': {
    ...footer,
    borderTopWidth: 0,
    pt: 0,
    '>button': {
      width: 'full',
    },
  },
  'footer-regular': { ...footer, borderTopWidth: 1 },
  'footer.-large': { ...footer, borderTopWidth: 1 },
} as Record<string, SxStyleProp>
