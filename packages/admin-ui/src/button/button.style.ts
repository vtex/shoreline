import { focusVisible, style, styleVariants } from '@vtex/admin-ui-core'

type ActionTone = 'main' | 'critical' | 'neutral'
type ActionVariant = 'primary' | 'secondary' | 'tertiary'

interface ActionOptions {
  tone: ActionTone
  variant: ActionVariant
}

function action(options: ActionOptions) {
  const { tone, variant } = options

  return style({
    color: `action.${tone}.${variant}`,
    bg: `action.${tone}.${variant}`,
    ':hover': {
      color: `action.${tone}.${variant}Hover`,
      bg: `action.${tone}.${variant}Hover`,
    },
    ':active': {
      color: `action.${tone}.${variant}Pressed`,
      bg: `action.${tone}.${variant}Pressed`,
    },
    ':disabled': {
      bg: variant === 'tertiary' ? 'transparent' : '$disabled',
      color: '$disabled',
    },
    ...focusVisible(tone),
  })
}

export const buttonStyle = style({
  text: '$action1',
  border: 'none',
  borderRadius: 'default',
  cursor: 'pointer',
  position: 'relative',
})

export const bleedY = styleVariants({
  size: {
    normal: {
      marginY: '$-l',
    },
    large: {
      marginY: '$-xl',
    },
  },
})

export const bleedX = styleVariants({
  size: {
    normal: {
      marginX: '$-l',
    },
    large: {
      marginX: '$-xl',
    },
  },
})

export const variants = styleVariants({
  variant: {
    primary: action({
      tone: 'main',
      variant: 'primary',
    }),
    secondary: action({
      tone: 'main',
      variant: 'secondary',
    }),
    tertiary: action({
      tone: 'main',
      variant: 'tertiary',
    }),
    critical: action({
      tone: 'critical',
      variant: 'primary',
    }),
    criticalSecondary: action({
      tone: 'critical',
      variant: 'secondary',
    }),
    criticalTertiary: action({
      tone: 'critical',
      variant: 'tertiary',
    }),
    neutralTertiary: action({
      tone: 'neutral',
      variant: 'tertiary',
    }),
  },
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

export const innerContainerStyle = style({
  text: '$action1',
})

export const innerContainerVariants = styleVariants({
  loading: {
    true: {
      visibility: 'hidden',
    },
    false: {
      visibility: 'visible',
    },
  },
  iconPosition: {
    start: {
      flexDirection: 'row',
      svg: {
        paddingRight: '$s',
      },
    },
    end: {
      flexDirection: 'row-reverse',
      svg: {
        paddingLeft: '$xs',
      },
    },
  },
})

export const spinnerContainerStyle = style({
  text: '$action1',
  position: 'absolute',
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
  svg: {
    size: '1.3rem',
  },
})
