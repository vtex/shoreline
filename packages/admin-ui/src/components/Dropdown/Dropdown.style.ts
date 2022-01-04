import type { StyleProp } from '@vtex/admin-ui-core'

function css(csx: StyleProp): StyleProp {
  return csx
}

export const container = css({
  position: 'relative',
})

export function listboxItem(options: { selected: boolean }) {
  const { selected } = options

  return css({
    color: selected ? '$action.main.tertiarySelected' : '$action.main.tertiary',
    bg: selected ? '$action.main.tertiarySelected' : '$action.main.tertiary',
    text: '$action2',
    display: 'flex',
    alignItems: 'center',
    height: 24,
    paddingX: 4,
    cursor: 'pointer',
  })
}

export function menu(options: { visible: boolean }) {
  const { visible } = options

  return css({
    visibility: visible ? 'visible' : 'hidden',
    bg: '$primary',
    border: '$neutral',
    borderRadius: '$default',
    boxShadow: '$overlay.center',
    cursor: 'pointer',
    outline: 'none',
    marginTop: 1,
    paddingY: 4,
    minWidth: 'inherit',
    width: 'max-content',
    position: 'absolute',
    zIndex: 999,
  })
}
