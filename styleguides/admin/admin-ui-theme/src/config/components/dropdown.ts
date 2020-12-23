const menu = {
  visibility: 'hidden',
  cursor: 'pointer',
  bg: 'light.primary',
  borderRadius: 'default',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'mid.secondary',
  boxShadow: 'menu',
  outline: 'none',
  marginTop: 1,
  paddingY: 4,
  width: 'max-content',
  position: 'absolute',
  zIndex: 999,
}

const item = {
  display: 'flex',
  alignItems: 'center',
  height: 24,
  paddingX: 4,
  cursor: 'pointer',
  bg: 'light.primary',
}

export default {
  menu,
  'menu-visible': {
    ...menu,
    visibility: 'visible',
  },
  item,
  'item-active': {
    ...item,
    bg: 'blue.secondary',
  },
}
