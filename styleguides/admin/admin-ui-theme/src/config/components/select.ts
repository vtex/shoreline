import { colors } from '../base'

const container = {
  width: 288,
  position: 'relative',
}

const optionsPortal = {
  position: 'absolute',
  zIndex: 999,
  width: 'inherit',
  backgroundColor: 'light.primary',
  outline: 'none',
}

const optionsContainer = {
  display: 'flex',
  flexDirection: 'column',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'mid.primary',
  borderRadius: 'default',
}

const optionsLabel = {
  text: 'small',
  lineHeight: 1.5,
  paddingTop: 2,
  paddingBottom: 1,
  paddingLeft: 3,
  color: 'mid.primary',
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
  color: 'dark.primary',
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
  borderColor: 'mid.secondary',
  borderRadius: 'default',
  bg: 'inherit',
  fontSize: 1,
  color: 'dark.secondary',
  outline: 0,
  ':hover': {
    borderColor: 'mid.primary',
  },
  ':hover > svg': {
    color: 'dark.primary',
  },
  ':focus': {
    borderColor: colors.blue.default,
    boxShadow: `0 0 0 1px ${colors.blue.default}`,
  },
  ':disabled': {
    bg: 'light.secondary',
    borderColor: 'mid.primary',
    color: 'dark.secondary',
    cursor: 'initial',
  },
  ':disabled > svg': {
    color: 'dark.secondary',
  },
}

const buttonError = {
  ...button,
  borderColor: 'red',
  ':focus': {
    borderColor: 'red',
    boxShadow: `0 0 0 1px ${colors.red.default}`,
  },
  ':hover': {
    borderColor: 'red',
  },
}

const selectedItem = {
  lineHeight: 1.43,
  color: 'dark.primary',
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
  lineHeight: 1.5,
  paddingLeft: 3,
  color: 'dark.secondary',
  zIndex: 2,
}

const mobileLabelSelectedItem = {
  ...mobileLabel,
  top: 2,
  text: 'small',
}

const mobileSelect = {
  color: 'dark.primary',
  outline: 'none',
  fontSize: 1,
  appearance: 'none',
  backgroundColor: 'transparent',
  border: '1px solid',
  borderColor: 'mid.secondary',
  borderRadius: 'default',
  paddingTop: '1.125rem',
  paddingLeft: 3,
  width: '100%',
  height: '100%',
  ':focus': {
    borderColor: 'blue',
    boxShadow: `0 0 0 1px ${colors.blue.default}`,
  },
  ':disabled': {
    bg: 'light.secondary',
    borderColor: 'mid.primary',
    color: 'dark.primary',
    opacity: 1,
  },
  ':disabled > svg': {
    color: 'dark.secondary',
  },
}

const mobileSelectError = {
  ...mobileSelect,
  borderColor: 'red',
  ':focus': {
    borderColor: 'red',
    boxShadow: `0 0 0 1px ${colors.red.default}`,
  },
}

const mobileIcon = {
  position: 'absolute',
  right: 12,
  top: '25%',
  color: 'dark.secondary',
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
