import { colors } from '../base'

const textAreaInputStyle = {
  paddingTop: 24,
  height: 100,
  resize: 'none',
  fontVariationSettings: '"wght" 92',
  width: 'full',
  borderStyle: 'solid',
  borderWidth: 1,
  paddingLeft: 3,
  paddingRight: 4,
  borderColor: 'muted.3',
  borderRadius: 'default',
  bg: 'inherit',
  marginY: 1,
  fontSize: 1,
  color: 'text',
  outline: 0,
  transition: 'snap',
  ':hover': {
    borderColor: 'text',
  },
  ':focus': {
    borderColor: 'primary.base',
    boxShadow: `0 0 0 1px  ${colors.primary.base}`,
  },
  ':disabled': {
    bg: 'muted.4',
    borderColor: 'muted.1',
    color: 'muted.1',
  },
  // Label styles
  ':focus + label': {
    transform: 'translate(1px, 4px) scale(0.875)',
    color: 'primary.base',
  },
  ':placeholder-shown:not(:focus) + label': {
    paddingTop: 1,
  },
  ':active + label': {
    transform: 'translate(1px, 4px) scale(0.875)',
  },
  ':not(:placeholder-shown) + label': {
    transform: 'translate(1px, 4px) scale(0.875)',
  },
  label: {
    fontSize: 1,
    left: 12,
    paddingTop: 2,
    color: 'muted.1',
    marginBottom: 3,
    position: 'absolute',
    transform: 'translate(0, 16px) scale(1)',
    transformOrigin: 'top left',
    transition: 'all 0.2s ease-out;',
  },
}

const styles = {
  display: 'flex',
  position: 'relative',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  width: 'full',
  label: {
    fontSize: 1,
    left: 12,
    paddingTop: 2,
    color: 'muted.1',
    marginBottom: 3,
    position: 'absolute',
    transform: 'translate(0, 16px) scale(1)',
    transformOrigin: 'top left',
    transition: 'all 0.2s ease-out;',
  },
}

const error = {
  textarea: {
    borderColor: 'danger.base',
    ':focus': {
      borderColor: 'danger.base',
      boxShadow: `0 0 0 1px  ${colors.danger.base}`,
    },
    ':focus + label': {
      transform: 'translate(1px, 4px) scale(0.875)',
      color: 'danger.base',
    },
    ':hover': {
      borderColor: 'danger.hover',
    },
  },
  label: {
    color: 'danger.base',
    fontSize: 1,
    left: 12,
    paddingTop: 2,
    marginBottom: 3,
    position: 'absolute',
    transform: 'translate(0, 16px) scale(1)',
    transformOrigin: 'top left',
    transition: 'all 0.2s ease-out;',
  },
}

export default {
  container: { ...styles },
  default: { ...textAreaInputStyle },
  error: { ...styles, ...error },
}
