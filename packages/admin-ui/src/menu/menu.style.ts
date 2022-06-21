import { style, styleVariants } from '@vtex/admin-ui-core'
import * as defaultButtonStyle from '../button/button.style'

export const item = style({
  display: 'flex',
  alignItems: 'center',
  text: '$action2',
  height: '2.25rem',
  paddingY: '$l',
  paddingX: '$m',
  border: 'none',
  borderRadius: '$default',
  cursor: 'pointer',

  '> div': {
    justifyContent: 'flex-start',
  },

  svg: {
    marginRight: '$m',
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
  marginY: '$m',
  minWidth: '9rem',
  borderRadius: '$default',
  bg: '$primary',
  border: '$neutral',
  boxShadow: '$overlay.center',
  zIndex: 999,
})

export const popoverChildren = style({
  marginY: '$m',
  display: 'flex',
  flexDirection: 'column',
  padding: '$s',
})

export const divider = style({
  marginY: '$l',
  marginX: '$-l',
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
      padding: '$s',
      paddingX: '$m',
      height: '2.25rem',
    },
    large: {
      padding: '$m',
      paddingX: '$l',
      height: '2.75rem',
    },
  },
})

export const customMenuButtonSizeVariants = styleVariants({
  size: {
    normal: {
      padding: '$s',
      height: '2.25rem',
    },
    large: {
      padding: '$m',
      height: '2.75rem',
    },
  },
})

export const buttonInnerContainerStyle = defaultButtonStyle.innerContainerStyle

export const buttonInnerContainerVariants = styleVariants({
  iconPosition: {
    start: {
      flexDirection: 'row',
      paddingRight: '$s',
    },
    end: {
      flexDirection: 'row-reverse',
      svg: {
        marginLeft: '$xs',
      },
    },
    center: {},
  },
})
