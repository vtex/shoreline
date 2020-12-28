import { colors } from '../base'

const container = {
  width: 288,
  position: 'relative',
}

const optionsPortal = {
  position: 'absolute',
  zIndex: 999,
  width: 'inherit',
  backgroundColor: 'background',
  outline: 'none',
}

const optionsContainer = {
  display: 'flex',
  flexDirection: 'column',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'muted.0',
  borderRadius: 'default',
}

const optionsLabel = {
  text: 'small',
  lineHeight: 1.5,
  paddingTop: 2,
  paddingBottom: 1,
  paddingLeft: 3,
  color: 'text.secondary',
}

const optionsUl = {
  paddingBottom: 1,
  maxHeight: 150,
  width: 'inherit',
  overflowY: 'auto',
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
}

const item = {
  color: 'text.primary',
  verticalAlign: 'middle',
  listStyleType: 'none',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
}

const button = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  height: 48,
  width: 'inherit',
  boxShadow: `0 0 0 0 transparent`,
  borderStyle: 'solid',
  borderWidth: 1,
  paddingLeft: 3,
  paddingRight: 4,
  borderColor: 'muted.1',
  borderRadius: 'default',
  bg: 'inherit',
  fontSize: 1,
  color: 'text.secondary',
  outline: 0,
  ':hover': {
    borderColor: 'muted.0',
  },
  ':hover > svg': {
    color: 'text.primary',
  },
  ':focus': {
    borderColor: colors.primary.base,
    boxShadow: `0 0 0 1px ${colors.primary.base}`,
  },
  ':disabled': {
    bg: 'muted.3',
    borderColor: 'muted.0',
    color: 'text.secondary',
    cursor: 'initial',
  },
  ':disabled > svg': {
    color: 'text.secondary',
  },
}

const buttonError = {
  ...button,
  borderColor: 'danger.base',
  ':focus': {
    borderColor: 'danger.base',
    boxShadow: `0 0 0 1px ${colors.danger.base}`,
  },
  ':hover': {
    borderColor: 'danger.base',
  },
}

const selectedItem = {
  lineHeight: 1.43,
  color: 'text.primary',
  float: 'left',
  marginTop: '1.125rem',
  ':not(:empty) + label': {
    fontSize: 0,
    lineHeight: 1.5,
  },
}

const label = {
  lineHeight: 1.43,
  position: 'absolute',
  left: 12,
}

const mobileContainer = {
  position: 'relative',
  width: 288,
  height: 48,
}

const mobileLabel = {
  position: 'absolute',
  top: '25%',
  text: 'regular',
  lineHeight: 1.5,
  paddingLeft: 3,
  color: 'text.secondary',
  zIndex: 2,
}

const mobileLabelSelectedItem = {
  ...mobileLabel,
  top: 2,
  text: 'small',
}

const mobileSelect = {
  color: 'text.primary',
  outline: 'none',
  fontSize: 1,
  appearance: 'none',
  backgroundColor: 'transparent',
  border: '1px solid',
  borderColor: 'muted.1',
  borderRadius: 'default',
  paddingTop: '1.125rem',
  paddingLeft: 3,
  width: '100%',
  height: '100%',
  ':focus': {
    borderColor: 'primary.base',
    boxShadow: `0 0 0 1px ${colors.primary.base}`,
  },
  ':disabled': {
    bg: 'muted.3',
    borderColor: 'muted.0',
    color: 'text.primary',
    opacity: 1,
  },
  ':disabled > svg': {
    color: 'text.secondary',
  },
}

const mobileSelectError = {
  ...mobileSelect,
  borderColor: 'danger.base',
  ':focus': {
    borderColor: 'danger.base',
    boxShadow: `0 0 0 1px ${colors.danger.base}`,
  },
}

const mobileIcon = {
  position: 'absolute',
  right: 12,
  top: '25%',
  color: 'text.secondary',
}

export default {
  container,
  optionsPortal,
  optionsContainer,
  optionsLabel,
  optionsUl,
  item,
  button,
  buttonError,
  selectedItem,
  label,
  mobileContainer,
  mobileLabel,
  mobileLabelSelectedItem,
  mobileSelect,
  mobileSelectError,
  mobileIcon,
}
