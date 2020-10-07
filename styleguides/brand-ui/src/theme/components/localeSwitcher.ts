import { SxStyleProp } from 'theme-ui'

const label: SxStyleProp = {
  mx: 2,
}

const overlay: SxStyleProp = {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: ['block', 'block', 'block', 'none'],
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  top: 0,
  left: 0,
  zIndex: -1,
}

const optionContainerLarge: SxStyleProp = {
  position: 'absolute',
  display: ['none', 'none', 'none', 'flex'],
  flexDirection: 'column',
  bg: 'primary.contrast',
  width: '9rem',
  px: 6,
  py: 4,
  mt: '6rem',
  borderLeft: '1px solid',
  borderBottom: '1px solid',
  borderColor: 'muted.3',
}

const baseOption: SxStyleProp = {
  cursor: 'pointer',
  my: 3,
}

const option: SxStyleProp = {
  ...baseOption,
  active: {
    ...baseOption,
    color: 'primary.base',
  },
}

const localeSwitcher: SxStyleProp = {
  display: ['none', 'none', 'none', 'flex'],
  width: '100%',
  height: '100%',
  color: 'muted.0',
  alignItems: 'center',
  justifyContent: 'center',
  borderLeftColor: 'muted.3',
  borderLeftWidth: '1px',
  borderLeftStyle: 'solid',
  cursor: 'pointer',
  fontWeight: 'bolder',
  label,
  optionContainerLarge,
  option,
  overlay,
}

export default localeSwitcher
