import { colors } from '../base'

const styles = {
  display: 'flex',
  position: 'relative',
  justifyContent: 'flex-start',
  flexDirection: 'column',
}

const error = {
  input: {
    borderColor: 'danger.base',
    ':focus': {
      borderColor: 'danger.base',
      boxShadow: `0 0 0 1px  ${colors.danger.base}`,
    },
    ':focus + label': {
      transform: 'translate(4px, 4px) scale(0.875)',
      color: 'danger.base',
    },
    ':hover': {
      borderColor: 'danger.hover',
    },
  },
  label: {
    color: 'danger.base',
  },
}

export default {
  default: { ...styles },
  error: { ...styles, ...error },
}
