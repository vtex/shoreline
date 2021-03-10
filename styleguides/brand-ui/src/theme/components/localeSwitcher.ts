const labelLarge = {
  pl: 2,
  pr: '3.5rem',
}

const labelMobile = {
  px: 3,
}

const overlay = {
  backgroundColor: 'rgba(20, 32, 50, 0.8)',
  display: ['block', 'block', 'block', 'none'],
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  top: 0,
  left: 0,
  zIndex: 1,
}

const optionContainerLarge = {
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
  fontVariationSettings: 'regular',
  border: '1px solid',
  borderColor: 'muted.3',
  boxShadow: '0px 20px 25px rgba(20, 32, 50, 0.1)',
}

const optionContainerMobile = {
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
  fontVariationSettings: 'regular',
  border: '1px solid',
  borderColor: 'muted.3',
}

const baseOption = {
  cursor: 'pointer',
  my: 3,
  color: 'base.0',
}

const optionLarge = {
  ...baseOption,
  ':hover': {
    color: 'primary.base',
  },
  active: {
    ...baseOption,
    color: 'primary.base',
  },
}

const optionMobile = {
  ...optionLarge,
  color: 'secondary.base',
  my: 4,
}

const baseLocaleSwitcher = {
  width: '100%',
  color: 'muted.0',
  alignItems: 'center',
  cursor: 'pointer',
  fontVariationSettings: 'medium',
  fontSize: 1,
  bg: 'primary.contrast',
  border: 'none',
  outline: 'none',
}

const large = {
  ...baseLocaleSwitcher,
  display: ['none', 'none', 'none', 'flex'],
  ':hover': {
    color: 'secondary.base',
  },
  height: '100%',
  justifyContent: 'flex-start',
  borderLeft: '1px solid',
  borderColor: 'muted.3',
  optionContainer: optionContainerLarge,
  label: labelLarge,
  option: optionLarge,
}

const mobile = {
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
}

const localeSwitcher = {
  large,
  mobile: {
    ...mobile,
    open: {
      ...mobile,
      color: 'secondary.base',
    },
  },
  overlay,
  optionContainerLarge,
}

export default localeSwitcher
