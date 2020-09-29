import { mergeSx } from '@vtex-components/theme'
import { SxStyleProp } from 'theme-ui'
import { rgba } from 'polished'

import colors from '../colors'

const styles: SxStyleProp = {
  outline: 'none',
  bg: 'background',
  borderRadius: 3,
  borderColor: 'muted.3',
  borderStyle: 'solid',
  borderWidth: 1,
  position: 'relative',
  'header, footer': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'muted.3',
    borderStyle: 'solid',
    'button + button': {
      ml: 4,
    },
  },
  header: {
    py: 4,
    px: 6,
    height: '3.5rem',
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
  },
  section: {
    pt: 4,
    px: 6,
    pb: 6,
  },
  footer: {
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    bg: 'background',
    p: 6,
  },
  overflowY: 'auto',
  overflowX: 'hidden',
  maxHeight: '3/4',
}

export default {
  backdrop: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: rgba(colors.text, 0.8),
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  small: mergeSx<SxStyleProp>(styles, {
    width: 320,
    footer: {
      borderTopWidth: 0,
      pt: 0,
      '>button': {
        width: 'full',
      },
    },
  }),
  regular: mergeSx<SxStyleProp>(styles, {
    width: ['full', 'full', 560],
    footer: {
      borderTopWidth: 1,
    },
  }),
  large: mergeSx<SxStyleProp>(styles, {
    width: ['full', 'full', 800],
    header: {
      height: '5rem',
    },
    footer: {
      borderTopWidth: 1,
    },
  }),
} as Record<string, SxStyleProp>
