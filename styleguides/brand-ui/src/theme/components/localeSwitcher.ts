import { SxStyleProp } from 'theme-ui'

const labelLarge: SxStyleProp = {
  pl: 2,
  pr: '3.5rem',
  mt: '-1px',
}

const labelMobile: SxStyleProp = {
  px: 3,
}

const overlay: SxStyleProp = {
  backgroundColor: 'rgba(20, 32, 50, 0.8)',
  display: ['block', 'block', 'block', 'none'],
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  top: 0,
  left: 0,
  zIndex: 1,
}

const optionContainerLarge: SxStyleProp = {
  position: 'absolute',
  display: ['none', 'none', 'none', 'flex'],
  flexDirection: 'column',
  bg: 'primary.contrast',
  width: '11rem',
  right: 0,
  top: 0,
  px: 5,
  py: 4,
  mt: '5rem',
  fontWeight: '300',
  border: '1px solid',
  borderColor: 'muted.3',
  boxShadow: '0px 20px 25px rgba(20, 32, 50, 0.1)',
}

const optionContainerMobile: SxStyleProp = {
  position: 'fixed',
  display: ['flex', 'flex', 'flex', 'none'],
  flexDirection: 'column',
  bg: 'primary.contrast',
  width: '100%',
  zIndex: 2,
  right: 0,
  left: 0,
  bottom: '5rem',
  px: 5,
  py: 4,
  fontWeight: '300',
  border: '1px solid',
  borderColor: 'muted.3',
}

const baseOption: SxStyleProp = {
  cursor: 'pointer',
  my: 3,
  color: 'base.0',
}

const optionLarge: SxStyleProp = {
  ...baseOption,
  ':hover': {
    color: 'primary.base',
  },
  active: {
    ...baseOption,
    color: 'primary.base',
  },
}

const optionMobile: SxStyleProp = {
  ...optionLarge,
  color: 'secondary.base',
  my: 4,
}

const baseLocaleSwitcher: SxStyleProp = {
  width: '100%',
  color: 'muted.0',
  alignItems: 'center',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: 1,
  bg: 'primary.contrast',
}

const localeSwitcher: SxStyleProp = {
  large: {
    ...baseLocaleSwitcher,
    display: ['none', 'none', 'none', 'flex'],
    ':hover': {
      color: 'secondary.base',
    },
    height: '100%',
    justifyContent: 'flex-start',
    borderLeft: '1px solid',
    borderBottom: '1px solid',
    borderColor: 'muted.3',
    optionContainer: optionContainerLarge,
    label: labelLarge,
    option: optionLarge,
  },
  mobile: {
    ...baseLocaleSwitcher,
    display: ['flex', 'flex', 'flex', 'none'],
    position: 'fixed',
    justifyContent: 'space-between',
    px: 6,
    py: 5,
    bottom: 0,
    zIndex: 2,
    label: labelMobile,
    optionContainer: optionContainerMobile,
    borderTop: '1px solid',
    borderColor: 'muted.3',
    option: optionMobile,
  },
  overlay,
  optionContainerLarge,
}

export default localeSwitcher
