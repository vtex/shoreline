import type { StyleProp } from '@vtex/admin-ui-core'
import { focusVisible } from '@vtex/admin-ui-core'

function css(csx: StyleProp): StyleProp {
  return csx
}

export const baseline = css({
  text: '$body',
  paddingTop: 24,
  height: 100,
  resize: 'none',
  width: 'full',
  paddingLeft: 3,
  paddingRight: 4,
  borderRadius: 'default',
  marginY: 1,
  fontSize: 1,
  outline: 0,
  transition: 'snap',
  color: '$form.neutral',
  ':disabled': {
    bg: '$disabled',
    color: '$disabled',
    border: '$disabled',
  },
})

export const toneVariant = (tone: 'neutral' | 'critical') =>
  css({
    bg: `$form.${tone}`,
    border: `$form.${tone}`,
    ':not(:focus):hover': {
      border: `$form.${tone}Hover`,
    },
    ':focus': {
      border: `$form.${tone}Focus`,
      boxShadow: `$ring.${tone}`,
    },
    ...focusVisible(tone),
  })
