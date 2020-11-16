const menu = {
  visibility: 'hidden',
  cursor: 'pointer',
  bg: 'background',
  borderRadius: 'default',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'muted.1',
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
  bg: 'background',
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
    bg: 'secondary.base',
  },
}
