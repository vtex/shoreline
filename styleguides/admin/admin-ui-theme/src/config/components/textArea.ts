import { colors } from '../base'

const textAreaInputStyle = {
  fontFamily: 'sans',
  paddingTop: 24,
  height: 100,
  resize: 'none',
  fontSettings: 'regular',
  width: 'full',
  borderStyle: 'solid',
  borderWidth: 1,
  paddingLeft: 3,
  paddingRight: 4,
  borderColor: 'mid.secondary',
  borderRadius: 'default',
  bg: 'inherit',
  marginY: 1,
  fontSize: 1,
  color: 'dark.primary',
  outline: 0,
  transition: 'snap',
  ':hover': {
    borderColor: 'dark.primary',
  },
  ':focus': {
    borderColor: 'blue',
    boxShadow: `0 0 0 1px  ${colors.blue.default}`,
  },
  ':disabled': {
    bg: 'light.secondary',
    borderColor: 'mid.primary',
    color: 'mid.primary',
  },
  // Label styles
  ':focus + label': {
    transform: 'translate(1px, 4px) scale(0.875)',
  },
  ':placeholder-shown:not(:focus) + label': {
    paddingTop: 1,
  },
  ':not(:placeholder-shown) + label': {
    transform: 'translate(1px, 4px) scale(0.875)',
  },
}

const styles = {
  display: 'flex',
  position: 'relative',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  width: 'full',
}

const error = {
  textarea: {
    borderColor: 'red',
    ':focus': {
      borderColor: 'red',
      boxShadow: `0 0 0 1px  ${colors.red.default}`,
    },
    ':hover': {
      borderColor: 'red.hover',
    },
  },
}

export default {
  container: { ...styles },
  default: { ...textAreaInputStyle },
  'container-error': { ...styles, ...error },
  'text-container': {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 1,
  },
  'floating-label': {
    fontSize: 1,
    left: 12,
    paddingTop: 2,
    color: 'mid.primary',
    marginBottom: 3,
    position: 'absolute',
    transform: 'translate(0, 16px) scale(1)',
    transformOrigin: 'top left',
    transition: 'all 0.2s ease-out;',
  },
}
