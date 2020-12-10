const bottomBarStyles = {
  justifyContent: 'flex-end',
  flexDirection: 'row',
}

const bottomBar = {
  modal: {
    marginTop: ['1.5rem', '2rem', '2rem', '2rem'],
    paddingX: ['1.5rem', '2rem', '2rem', '2rem'],
    paddingBottom: ['1.5rem', '2rem', '2rem', '2rem'],
    ...bottomBarStyles,
  },
  dialog: {
    paddingTop: ['1.5rem', '1.5rem', '2rem', '2rem'],
    paddingX: ['1.5rem', '1.5rem', '4rem', '5.5rem'],
    paddingBottom: ['1.5rem', '1.5rem', '4rem', '4rem'],
    ...bottomBarStyles,
  },
}

const title = {
  padding: '2rem',
  height: '81px',
  paddingX: ['1.5rem', '2rem', '2rem', '2rem'],
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
    width: ['20rem', '20rem', '50rem', '62.5rem', '68rem'],
    ...boxStyles,
  },
}

const bodyStyles = {
  maxWidth: '100%',
  overflowY: 'auto',
}

const closeBar = {
  paddingTop: ['1.5rem', '1.5rem', '2rem', '2rem'],
  paddingBottom: ['1rem', '1rem', '2rem', '2rem'],
  height: ['64px', '64px', '80px', '80px'],
  paddingX: ['1.5rem', '2rem', '2rem', '2rem'],
}

const body = {
  modal: {
    maxHeight: '50vh',
    paddingX: ['1.5rem', '2rem', '2rem', '2rem'],
    paddingTop: ['1.5rem', '2rem', '2rem', '2rem'],
    fontSize: '.75rem',
    ...bodyStyles,
  },
  dialog: {
    maxHeight: ['50vh', '70vh', '50vh', '70vh', '70vh'],
    paddingX: ['1.5rem', '1.5rem', '3.5rem', '5.5rem'],
    ...bodyStyles,
  },
}

const modal = {
  bottomBar,
  title,
  closeBar,
  backdrop,
  box,
  body,
}

export default modal
