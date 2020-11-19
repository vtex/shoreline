const bottomBarStyles = {
  justifyContent: 'flex-end',
  flexDirection: 'row',
}

const bottomBar = {
  modal: {
    marginTop: ['1.5rem', '2rem', '2rem', '2rem'],
    paddingX: ['1rem', '2rem', '2rem', '2rem'],
    paddingBottom: ['1.5rem', '2rem', '2rem', '2rem'],
    ...bottomBarStyles,
  },
  dialog: {
    padding: '3rem',
    ...bottomBarStyles,
  },
}

const title = {
  padding: '2rem',
  height: '81px',
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

const boxStyles = {
  bg: 'white',
  borderRadius: '5px',
  boxShadow: '2px 4px 16px rgba(0, 0, 0, 0.3)',
  outline: 'none',
  margin: 'auto',
  position: 'relative',
  zIndex: '100000000',
}

const box = {
  modal: {
    width: ['20rem', '40rem', '40rem', '56rem'],
    justifyContent: 'center',
    ...boxStyles,
  },
  dialog: {
    width: '1110px',
    ...boxStyles,
  },
}

const bodyStyles = {
  maxWidth: '100%',
  overflowY: 'auto',
}

const body = {
  modal: {
    maxHeight: '50vh',
    paddingX: '2rem',
    paddingTop: '2rem',
    fontSize: '.75rem',
    ...bodyStyles,
  },
  dialog: {
    maxHeight: '70vh',
    paddingX: '4.12rem',
    paddingTop: '8rem',
    paddingBottom: '1.25rem',
    ...bodyStyles,
  },
}

const modal = {
  bottomBar,
  title,
  backdrop,
  box,
  body,
}

export default modal
