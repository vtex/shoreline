import { negative, style, styleVariants } from '@vtex/admin-ui-core'
import { action as actionColorScheme } from '../button/button.css'

export const item = style({
  display: 'flex',
  alignItems: 'center',
  text: '$action2',
  height: '2.25rem',
  paddingY: '$space-2',
  paddingX: '$space-2',
  border: 'none',
  borderRadius: '$base',
  cursor: 'pointer',

  '> div': {
    justifyContent: 'flex-start',
  },

  svg: {
    marginRight: '$space-2',
    size: '1.25rem',
  },
})

export const disabledItemWrapper = style({
  cursor: 'not-allowed',
})

export const itemVariants = styleVariants({
  variant: {
    critical: {
      ...actionColorScheme({
        tone: 'critical',
        variant: 'tertiary',
      }),
      ':active': {
        color: '$action.critical.tertiaryHover',
        bg: '$action.critical.tertiaryHover',
      },
    },
    neutral: {
      ...actionColorScheme({
        tone: 'neutral',
        variant: 'tertiary',
      }),
      ':active': {
        color: '$action.neutral.tertiaryHover',
        bg: '$action.neutral.tertiaryHover',
      },
    },
    disabled: {
      color: '$disabled',
    },
  },
})

export const popoverContainer = style({
  marginY: '$space-1',
  minWidth: '9rem',
  borderRadius: '$base',
  bg: '$primary',
  border: '$neutral',
  boxShadow: '$overlay.center',
  zIndex: '$z-3',
})

export const popoverChildren = style({
  marginY: '$space-1',
  display: 'flex',
  flexDirection: 'column',
  padding: '$space-2 $space-3',
})

export const divider = style({
  marginY: '$space-2',
  marginX: negative('$space-3'),
  borderBottom: '$neutral',
  width: 'auto',
  outline: 'none',
})

export const buttonStyle = style({
  text: '$action1',
  border: 'none',
  borderRadius: '$base',
  cursor: 'pointer',
  position: 'relative',
})

export const bleedY = styleVariants({
  size: {
    normal: {
      marginY: negative('$space-2'),
    },
    large: {
      marginY: negative('$space-3'),
    },
  },
})

export const bleedX = styleVariants({
  size: {
    normal: {
      marginX: negative('$space-3'),
    },
    large: {
      marginX: negative('$space-4'),
    },
  },
})

export const buttonColorVariants = styleVariants({
  variant: {
    primary: actionColorScheme({
      tone: 'main',
      variant: 'primary',
    }),
    secondary: actionColorScheme({
      tone: 'main',
      variant: 'secondary',
    }),
    tertiary: actionColorScheme({
      tone: 'main',
      variant: 'tertiary',
    }),
    neutralTertiary: actionColorScheme({
      tone: 'neutral',
      variant: 'tertiary',
    }),
  },
})

export const defaultMenuButtonSizeVariants = styleVariants({
  size: {
    normal: {
      padding: '$space-2 $space-3',
      paddingX: '$space-2',
      height: '2.25rem',
    },
    large: {
      padding: '$space-3 $space-4',
      paddingX: '$space-3',
      height: '2.75rem',
    },
  },
})

export const customMenuButtonSizeVariants = styleVariants({
  size: {
    normal: {
      padding: '$space-2 $space-3',
      height: '2.25rem',
    },
    large: {
      padding: '$space-3 $space-4',
      height: '2.75rem',
    },
  },
})

export const buttonInnerContainerStyle = style({ text: '$action1' })

export const buttonInnerContainerVariants = styleVariants({
  iconPosition: {
    start: {
      flexDirection: 'row',
      paddingRight: '$space-1',
    },
    end: {
      flexDirection: 'row-reverse',
      svg: {
        marginLeft: '$space-05',
      },
    },
    center: {},
  },
})
