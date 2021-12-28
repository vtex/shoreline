import type { StyleProp } from '@vtex/admin-ui-core'

function css(csx: StyleProp): StyleProp {
  return csx
}

export const container = css({
  position: 'relative',
  width: 288,
  height: 48,
})

export const baseline = css({
  text: '$body',
  outline: 'none',
  appearance: 'none',
  paddingTop: '1.125rem',
  paddingLeft: 3,
  width: '100%',
  height: '100%',
  borderRadius: 'default',
  ':disabled': {
    bg: '$disabled',
    border: '$disabled',
    color: '$disabled',
  },
})

export function toneVariant(tone: 'neutral' | 'critical') {
  return css({
    color: `$form.${tone}`,
    bg: `$form.${tone}`,
    border: `$form.${tone}`,
    ':focus': {
      border: `$form.${tone}Focus`,
      boxShadow: `$ring.${tone}`,
    },
  })
}

export function label(options: { active: boolean }) {
  const { active } = options

  return css({
    position: 'absolute',
    top: '25%',
    lineHeight: 1.5,
    paddingLeft: 3,
    color: '$secondary',
    zIndex: 2,
    transition: 'all 0.2s ease-out',
    ...(active ? { top: 2, text: '$detail' } : {}),
  })
}

export const caret = css({
  position: 'absolute',
  right: 12,
  top: '25%',
  color: '$secondary',
})
