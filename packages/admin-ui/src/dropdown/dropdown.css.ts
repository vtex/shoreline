import { csx, dataAttr } from '@vtex/admin-ui-core'

export const dropdownContainerTheme = csx({
  position: 'relative',
})

export const dropdownItemTheme = csx({
  color: '$action.main.tertiary',
  bg: '$action.main.tertiary',
  text: '$action2',
  display: 'flex',
  alignItems: 'center',
  height: 24,
  paddingX: '$space-4',
  cursor: 'pointer',

  [dataAttr('selected', 'true')]: {
    color: '$action.main.tertiarySelected',
    bg: '$action.main.tertiarySelected',
  },
})

export const dropdownPopoverTheme = csx({
  bg: '$primary',
  border: '$neutral',
  borderRadius: '$base',
  boxShadow: '$overlay.center',
  cursor: 'pointer',
  outline: 'none',
  marginTop: '$space-1',
  paddingY: '$space-4',
  minWidth: 'inherit',
  width: 'max-content',
  position: 'absolute',
  zIndex: '$z-4',
  [dataAttr('visible', 'true')]: { visibility: 'visible' },
  [dataAttr('visible', 'false')]: { visibility: 'hidden' },
})
