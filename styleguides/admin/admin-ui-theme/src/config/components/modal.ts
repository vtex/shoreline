import { rgba } from 'polished'

import { colors } from '../base'

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
  margin: 2,
  opacity: 0,
  transform: 'translate3d(0, 48px, 0)',
  transition: 'pop',
  '&[data-enter]': {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
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
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  borderRightWidth: 0,
  position: 'sticky',
  bottom: 0,
  left: 0,
  right: 0,
  bg: 'background',
  p: 6,
  flexDirection: ['column-reverse', 'column-reverse', 'row'],
  '>button': {
    width: ['full', 'full', 'inherit'],
  },
  '* + button': {
    ml: [0, 0, 4],
    mb: [4, 4, 0],
  },
}

export default {
  backdrop: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: ['flex-end', 'flex-end', 'center'],
    alignItems: 'center',
    backgroundColor: rgba(colors.text, 0.5),
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    opacity: 0,
    transition: 'fade',
    '&[data-enter]': {
      opacity: 1,
    },
  },
  'surface-small': {
    ...surface,
    width: ['calc(100% - 16px)', 'calc(100% - 16px)', 320],
  },
  'surface-regular': {
    ...surface,
    width: ['calc(100% - 16px)', 'calc(100% - 16px)', 560],
  },
  'surface-large': {
    ...surface,
    width: ['calc(100% - 16px)', 'calc(100% - 16px)', 800],
  },
  'header-small': { ...header, height: 56 },
  'header-regular': { ...header, height: 56 },
  'header-large': { ...header, height: 80 },
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
}
