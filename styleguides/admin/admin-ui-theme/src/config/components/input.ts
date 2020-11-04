import { colors } from '../base'

const inputStyle = {
  fontVariationSettings: '"wght" 92',
  width: 'full',
  height: 48,
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
    transform: 'translate(4px, 4px) scale(0.875)',
    color: 'primary.base',
  },
  ':placeholder-shown:not(:focus) + label': {
    paddingTop: 1,
  },
  ':active + label': {
    transform: 'translate(4px, 4px) scale(0.875)',
  },
  ':not(:placeholder-shown) + label': {
    transform: 'translate(4px, 4px) scale(0.875)',
  },
}

const clearButtonStyle = {
  color: 'muted.1',
  marginY: 4,
  marginRight: 2,
  height: 15,
  width: 15,
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'muted.1',
  borderRadius: 'circle',
  bg: 'transparent',
  cursor: 'pointer',
  ':focus:not([data-focus-visible-added])': {
    outline: 'none',
    boxShadow: 'none',
  },
  ':focus': {
    outline: 'none',
    boxShadow: 'focus',
  },
  '> div': {
    display: 'flex',
    height: 'full',
    width: 'full',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

const iconStyle = {
  color: 'muted.1',
  top: 1,
  left: 0,
  paddingX: 3,
  paddingTop: '14px',
  position: 'absolute',
  width: 44,
  height: 48,
  svg: {
    height: 20,
    width: 20,
    minWidth: 20,
    minHeight: 20,
  },
}

const suffixStyle = {
  color: 'muted.1',
  borderLeftStyle: 'solid',
  borderLeftWidth: '1px',
  borderLeftColor: 'muted.3',
  paddingTop: '14px',
  marginTop: 'px',
  width: '32px',
  paddingLeft: 3,
  lineHeight: 'body',
  fontVariationSettings: 'regular',
  fontSize: 1,
}

const inputVariants = {
  default: { ...inputStyle },
  'with-icon': { ...inputStyle, paddingLeft: '44px' },
  'with-suffix': { ...inputStyle, paddingRight: '64px' },
  'with-clear': {
    ...inputStyle,
    paddingRight: '44px',
  },
  'with-icon-clear': {
    ...inputStyle,
    paddingLeft: '44px',
    paddingRight: '44px',
  },
  'with-icon-suffix': {
    ...inputStyle,
    paddingRight: '64px',
    paddingLeft: '44px',
  },
  'with-suffix-clear': {
    ...inputStyle,
    paddingRight: '75px',
  },
  'with-icon-suffix-clear': {
    ...inputStyle,
    paddingLeft: '44px',
    paddingRight: '75px',
  },
}

const containerStyles = {
  position: 'relative',
}

export default {
  container: { ...containerStyles },
  'container-with-icon': {
    ...containerStyles,
    label: { left: '41px' },
  },
  'icon-style': { ...iconStyle },
  'suffix-style': { ...suffixStyle },
  'clear-button-style': { ...clearButtonStyle },
  ...inputVariants,
}
