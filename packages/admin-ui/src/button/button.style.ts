import { negative, style, styleVariants } from '@vtex/admin-ui-core'

type ActionTone = 'main' | 'critical' | 'neutral'
type ActionVariant = 'primary' | 'secondary' | 'tertiary'

interface ActionOptions {
  tone: ActionTone
  variant: ActionVariant
}

export function action(options: ActionOptions) {
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
    ':focus': {
      outline: 'none',
      boxShadow: 'none',
    },
    ':focus-visible': {
      outline: 'none',
      boxShadow: `$ring.${tone}`,
    },
    ':focus-visible:not(:active)': {
      color: `action.${tone}.${variant}Hover`,
      bg: `action.${tone}.${variant}Hover`,
    },
  })
}

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
      padding: '$space-2 $space-3',
      height: '2.25rem',
    },
    large: {
      padding: '$space-3 $space-4',
      height: '2.75rem',
    },
  },
})

export const innerContainerStyle = style({
  text: '$action1',
  whiteSpace: 'nowrap',
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
        marginRight: '$space-1',
      },
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

export const spinnerContainerStyle = style({
  text: '$action1',
  position: 'absolute',
  bottom: '$space-0',
  top: '$space-0',
  left: '$space-0',
  right: '$space-0',
  svg: {
    size: '1.3rem',
  },
})
