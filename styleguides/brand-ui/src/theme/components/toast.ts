import { SxStyleProp } from 'theme-ui'

const container: SxStyleProp = {
  position: 'fixed',
  bottom: [0, 3],
  left: [0, 3],
  flexWrap: 'wrap',
  width: ['100%', 'auto'],
  wordWrap: 'normal',
  ':last-child': {
    mb: [0, 3],
  },
}

const dismiss: SxStyleProp = {
  bg: 'transparent',
  border: 'none',
  display: ['none', 'flex'],
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  mt: -1,
}

const actionContainer: SxStyleProp = {
  display: 'flex',
  alignItems: 'center',
  width: ['100%', 'auto'],
  textAlign: ['right', 'start'],
  justifyContent: ['flex-end', 'space-between'],
}

const action: SxStyleProp = {
  bg: 'transparent',
  border: 'none',
  mr: [0, 2],
  ml: [0, 6],
  fontWeight: 600,
  textTransform: 'uppercase',
  cursor: 'pointer',
}

const text: SxStyleProp = {
  fontSize: 2,
}

const wrapper: SxStyleProp = {
  mb: 3,
}

const toast: SxStyleProp = {
  wrapper,
  container,
  dismiss,
  actionContainer,
  action,
  text,
  backgroundColor: 'text',
  color: 'white',
  py: 4,
  pl: '20px',
  pr: 4,
  borderRadius: '4px',
  width: 'auto',
  minWidth: ['100%', '300px'],
  maxWidth: ['100%', '480px'],
  position: 'relative',
  display: 'flex',
  alignItems: ['flex-start', 'center'],
  justifyContent: 'space-between',
  flexDirection: ['column', 'row'],
  border: 'none',
  flexWrap: 'wrap',
  wordWrap: 'break-word',
}

export default toast
