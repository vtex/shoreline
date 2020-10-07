import { SxStyleProp } from 'theme-ui'

const label: SxStyleProp = {
  pl: 5,
  pr: 6,
}

const overlay: SxStyleProp = {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: ['block', 'block', 'block', 'none'],
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  top: 0,
  left: 0,
}

const optionContainerLarge: SxStyleProp = {
  position: 'absolute',
  display: ['none', 'none', 'none', 'flex'],
  flexDirection: 'column',
  bg: 'primary.contrast',
  width: '8rem',
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

const baseOption: SxStyleProp = {
  cursor: 'pointer',
  my: 2,
  color: 'base.0',
}

const option: SxStyleProp = {
  ...baseOption,
  active: {
    ...baseOption,
    color: 'primary.base',
  },
}

const baseLocaleSwitcher: SxStyleProp = {
  width: '100%',
}

const localeSwitcher: SxStyleProp = {
  large: {
    ...baseLocaleSwitcher,
    display: ['none', 'none', 'none', 'flex'],
    bg: 'background',
    color: 'muted.0',
    ':hover': {
      color: 'secondary.base',
    },
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderLeftColor: 'muted.3',
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    cursor: 'pointer',
    fontSize: 1,
    fontWeight: '600',
    optionContainer: optionContainerLarge,
    label,
    option,
  },
  mobile: {
    ...baseLocaleSwitcher,
    display: ['flex', 'flex', 'flex', 'none'],
    bg: 'primary.contrast',
  },
  overlay,
  optionContainerLarge,
}

export default localeSwitcher
