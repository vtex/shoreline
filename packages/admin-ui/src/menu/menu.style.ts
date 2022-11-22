import { negative, style, styleVariants } from '@vtex/admin-ui-core'
import * as defaultButtonStyle from '../button/button.style'

export const item = style({
  display: 'flex',
  alignItems: 'center',
  text: '$action2',
  height: '2.25rem',
  paddingY: '$space-2',
  paddingX: '$space-2',
  border: 'none',
  borderRadius: '$border-radius-base',
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
      ...defaultButtonStyle.action({
        tone: 'critical',
        variant: 'tertiary',
      }),
      ':active': {
        color: '$action.critical.tertiaryHover',
        bg: '$action.critical.tertiaryHover',
      },
    },
    neutral: {
      ...defaultButtonStyle.action({
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
  borderRadius: '$border-radius-base',
  bg: '$primary',
  border: '$neutral',
  boxShadow: '$overlay.center',
  zIndex: 999,
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

export const buttonStyle = defaultButtonStyle.buttonStyle
export const bleedY = defaultButtonStyle.bleedY
export const bleedX = defaultButtonStyle.bleedX

export const buttonColorVariants = styleVariants({
  variant: {
    primary: defaultButtonStyle.action({
      tone: 'main',
      variant: 'primary',
    }),
    secondary: defaultButtonStyle.action({
      tone: 'main',
      variant: 'secondary',
    }),
    tertiary: defaultButtonStyle.action({
      tone: 'main',
      variant: 'tertiary',
    }),
    neutralTertiary: defaultButtonStyle.action({
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

export const buttonInnerContainerStyle = defaultButtonStyle.innerContainerStyle

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
