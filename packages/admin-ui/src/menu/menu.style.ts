import { style, styleVariants } from '@vtex/admin-ui-core'
import * as deafultButtonStyle from '../button/button.style'

export const item = style({
  paddingY: '$l',
  paddingX: '$m',
  text: '$action2',
  border: 'none',
  textTransform: 'initial',
  width: 'full',
  div: {
    justifyContent: 'flex-start',
  },
  height: '2.25rem',
  svg: {
    marginRight: '$m',
    size: '1.25rem',
  },
  borderRadius: '$default',
  cursor: 'pointer',
  position: 'relative',
})

export const itemVariants = styleVariants({
  tone: {
    critical: deafultButtonStyle.action({
      tone: 'critical',
      variant: 'tertiary',
    }),
    main: deafultButtonStyle.action({
      tone: 'neutral',
      variant: 'tertiary',
    }),
  },
})

export const list = style({
  outline: 'none',
  zIndex: 999,
  display: 'flex',
  flexDirection: 'column',
  padding: '$s',
  minWidth: '9rem',
  borderRadius: '$default',
  bg: '$primary',
  border: '$neutral',
  boxShadow: '$overlay.center',
})

export const divider = style({
  marginY: '$l',
  marginX: '$-l',
  borderBottom: '$neutral',
  width: 'auto',
  outline: 'none',
})

export const buttonStyle = deafultButtonStyle.buttonStyle

export const colorVariants = styleVariants({
  variant: {
    primary: deafultButtonStyle.action({
      tone: 'main',
      variant: 'primary',
    }),
    secondary: deafultButtonStyle.action({
      tone: 'main',
      variant: 'secondary',
    }),
    tertiary: deafultButtonStyle.action({
      tone: 'main',
      variant: 'tertiary',
    }),
    neutralTertiary: deafultButtonStyle.action({
      tone: 'neutral',
      variant: 'tertiary',
    }),
  },
})

export const actionsButtonSizeVariants = styleVariants({
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

export const menuButtonSizeVariants = styleVariants({
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

export const innerContainerStyle = deafultButtonStyle.innerContainerStyle

export const innerContainerVariants = styleVariants({
  iconPosition: {
    start: {
      flexDirection: 'row',
      paddingRight: '$m',
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
