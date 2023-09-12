import { dataAttr, csx, negative, style } from '@vtex/admin-ui-core'

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

export const buttonTheme = csx({
  text: '$action1',
  border: 'none',
  borderRadius: '$base',
  cursor: 'pointer',
  position: 'relative',
  [dataAttr('variant', 'primary')]: action({
    tone: 'main',
    variant: 'primary',
  }),
  [dataAttr('variant', 'secondary')]: action({
    tone: 'main',
    variant: 'secondary',
  }),
  [dataAttr('variant', 'tertiary')]: action({
    tone: 'main',
    variant: 'tertiary',
  }),
  [dataAttr('variant', 'critical')]: action({
    tone: 'critical',
    variant: 'primary',
  }),
  [dataAttr('variant', 'criticalSecondary')]: action({
    tone: 'critical',
    variant: 'secondary',
  }),
  [dataAttr('variant', 'criticalTertiary')]: action({
    tone: 'critical',
    variant: 'tertiary',
  }),
  [dataAttr('variant', 'neutralTertiary')]: action({
    tone: 'neutral',
    variant: 'tertiary',
  }),
  [dataAttr('size', 'normal')]: {
    padding: '$space-2 $space-3',
    height: '2.25rem',
  },
  [dataAttr('size', 'large')]: {
    padding: '$space-3 $space-4',
    height: '2.75rem',
  },
  [dataAttr({ size: 'normal', 'bleed-y': true })]: {
    marginY: negative('$space-2'),
  },
  [dataAttr({ size: 'large', 'bleed-y': true })]: {
    marginY: negative('$space-3'),
  },
  [dataAttr({ size: 'normal', 'bleed-x': true })]: {
    marginX: negative('$space-3'),
  },
  [dataAttr({ size: 'large', 'bleed-x': true })]: {
    marginX: negative('$space-4'),
  },
})

export const innerContainerTheme = csx({
  text: '$action1',
  [dataAttr('loading', true)]: {
    visibility: 'hidden',
  },
  [dataAttr('loading', false)]: {
    visibility: 'visible',
  },
  [dataAttr('icon-position', 'start')]: {
    flexDirection: 'row',
    svg: {
      marginRight: '$space-1',
    },
  },
  [dataAttr('icon-position', 'end')]: {
    flexDirection: 'row-reverse',
    svg: {
      marginLeft: '$space-05',
    },
  },
})

export const spinnerContainerTheme = csx({
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
