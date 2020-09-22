const open = {
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  left: '0',
  bottom: '0',
  top: '0',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'muted.4',
  marginTop: '5.1rem',
  paddingBottom: '5.1rem',
}

const menu = {
  flexDirection: 'column',
  paddingY: 4,
  '> a': {
    textDecoration: 'none',
    transition: 'color 0.15s ease-in',
    color: 'secondary.base',
    marginY: 4,
    paddingX: 6, // AJUSTAR ISSO
  },
}

const actionButton = {
  zIndex: 2147483647,
  borderTop: 'solid',
  borderTopWidth: '1px',
  borderTopColor: 'muted.3',
}

const hamburgerMenu = {
  display: ['flex', 'flex', 'flex', 'none'],
  height: '100%',
  paddingX: 6,
  paddingY: 5,
  justifyContent: 'end',
  alignItems: 'center',
  color: 'primary.base',
  borderLeft: 'solid',
  borderLeftWidth: '1px',
  borderLeftColor: 'muted.3',
  cursor: 'pointer',
  open,
  menu,
  actionButton,
}

export default hamburgerMenu
