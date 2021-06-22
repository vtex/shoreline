import { StyleObject } from '@vtex/admin-core'

function styles(csx: StyleObject): StyleObject {
  return csx
}

const scrollbar = styles({
  scrollbarWidth: 'thin',
  scrollbarColor: 'light.primary',
  '::-webkit-scrollbar': {
    width: '8px',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'mid.tertiary',
    borderRadius: '6px',
    border: '2px solid',
    color: 'light.primary',
  },
})

const box = styles({
  bg: 'light.primary',
  borderRadius: 4,
  border: '1px solid',
  borderColor: 'mid.tertiary',
  boxShadow: '0px 20px 40px rgba(0,0,0,.24)',
})

const menu = styles({
  bg: 'light.primary',
  listStyle: 'none',
  width: '100%',
  maxHeight: 500,
  overflow: 'auto',
  marginTop: 2,
  ...scrollbar,
})

/**
 * TODO: use a smooth transition
 */
const option = styles({
  paddingX: 3,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  border: 'divider-top',
  ':first-child': {
    border: 'none',
  },
})

const inputContainer = styles({
  position: 'relative',
})

const input = styles({
  height: 64,
  width: '100%',
  fontSize: 16,
  paddingX: 56,
  text: 'body',
  ':focus': {
    outline: 'none',
    boxShadow: 'none',
  },
  borderTopRightRadius: 4,
  borderTopLeftRadius: 4,
  border: 'divider-bottom',
  marginBottom: 2,
})

const inputIcon = styles({
  color: 'blue',
  size: 28,
  position: 'absolute',
  top: '18px',
  left: 4,
})

const inputButton = styles({
  position: 'absolute',
  right: 4,
  top: 3,
})

const label = styles({
  paddingLeft: 3,
  color: 'dark.secondary',
  fontSize: 0,
})

const footer = styles({
  fontSize: 0,
  fontSettings: 'regular',
  height: 40,
  textAlign: 'center',
  border: 'divider-top',
  bg: 'sidebar.light',
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  'div + div': {
    marginLeft: 5,
  },
  color: 'dark.secondary',
})

const kbd = styles({
  bg: 'mid.tertiary',
  color: 'dark.secondary',
  borderRadius: 4,
  paddingY: '2px',
  paddingX: 1,
  fontSize: '11px',
  textTransform: 'uppercase',
  fontWeight: 400,
  fontVariationSettings: 'initial',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
})

export default {
  box,
  menu,
  option,
  inputContainer,
  input,
  inputIcon,
  inputButton,
  label,
  footer,
  kbd,
}
