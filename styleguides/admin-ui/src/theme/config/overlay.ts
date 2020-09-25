import { mergeSx } from '@vtex-components/theme'
import { SxStyleProp } from 'theme-ui'
import { rgba } from 'polished'

import space from './space'
import colors from './colors'

const modalStyles: SxStyleProp = {
  outline: 'none',
  bg: 'background',
  borderRadius: 3,
  borderColor: 'muted.4',
  borderStyle: 'solid',
  borderWidth: 1,
  position: 'relative',
  'header, footer': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    py: 9,
    px: 13,
    borderColor: 'muted.4',
    borderStyle: 'solid',
  },
  header: {
    height: '3.5rem',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    h1: {
      variant: 'text.subtitle',
      lineHeight: 0,
    },
  },
  section: {
    pt: 9,
    px: 13,
    pb: 13,
  },
  footer: {
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    'button + button': {
      ml: 9,
    },
  },
}

export default {
  tooltip: {
    backgroundColor: 'text',
    color: 'background',
    fontSize: 1,
    paddingY: 5,
    paddingX: 7,
    borderRadius: 3,
    height: 10,
  },
  modal: {
    backdrop: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: rgba(colors.text, 0.95),
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
    },
    small: mergeSx<SxStyleProp>(modalStyles, {
      width: 320,
      footer: {
        borderTopWidth: 0,
        '>button': {
          width: 'full',
        },
      },
    }),
    regular: mergeSx<SxStyleProp>(modalStyles, {
      width: 560,
      footer: {
        borderTopWidth: 1,
      },
    }),
    large: mergeSx<SxStyleProp>(modalStyles, {
      width: 800,
      footer: {
        borderTopWidth: 1,
      },
    }),
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    bg: 'background',
    marginTop: 4,
    paddingX: 7,
    paddingTop: 7,
    paddingBottom: 5,
    minWidth: 18,
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'muted.2',
    boxShadow: 'menu',
    hr: {
      marginY: 5,
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderColor: 'muted.2',
      width: `calc(100% -${space[7]})`,
      marginX: `-${space[7]}`,
      outline: 'none',
    },
    '> button': {
      marginY: 2,
      paddingY: 4,
      paddingX: 3,
      color: 'text',
      fontSize: 1,
      border: 'none',
      textTransform: 'initial',
      ':focus': {
        bg: 'primary.washed.0',
        outline: 'none',
        boxShadow: 'none',
      },
      ':hover': {
        color: 'text',
      },
      width: 'full',
      div: {
        justifyContent: 'flex-start',
      },
      svg: {
        marginLeft: 0,
        marginRight: 5,
      },
    },
  },
} as Record<string, SxStyleProp>
