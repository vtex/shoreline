const actionsBar = {
  justifyContent: 'flex-end',
  flexDirection: 'row',
  marginTop: ['1.5rem', '2rem', '2rem', '2rem'],
  paddingX: ['1rem', '2rem', '2rem', '2rem'],
  paddingBottom: ['1.5rem', '2rem', '2rem', '2rem'],
}

const title = {
  padding: '2rem',
  paddingLeft: ['1rem', '2rem', '2rem', '2rem'],
  borderRadius: '5px 5px 0px 0px',
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'muted.3',
}

const backdrop = {
  width: '100%',
  height: '100%',
  bg: 'rgba(52, 52, 52, 0.3)',
  position: 'fixed',
  top: 0,
  left: 0,
  flexDirection: 'column',
  alignItems: 'center',
  display: 'flex',
}

const dialog = {
  width: ['20rem', '40rem', '40rem', '56rem'],
  bg: 'white',
  justifyContent: 'center',
  margin: 'auto',
  borderRadius: '5px',
  boxShadow: '2px 4px 16px rgba(0, 0, 0, 0.3)',
  outline: 'none',
  position: 'relative',
  zIndex: '100000000',
}

const body = {
  maxHeight: '50vh',
  overflowY: 'auto',
  paddingX: '2rem',
  paddingTop: '2rem',
  fontSize: '.75rem',
  maxWidth: '100%',
}

const modal = {
  actionsBar,
  title,
  backdrop,
  dialog,
  body,
}

export default modal
