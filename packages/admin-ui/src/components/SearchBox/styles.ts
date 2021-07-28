import type { StyleObject } from '@vtex/admin-core'

function styles(csx: StyleObject): StyleObject {
  return csx
}

const typography = {
  title: styles({
    fontFamily: 'sans',
    fontSize: '1.2rem',
    fontSettings: "'wght' 72",
  }),
  body: styles({
    fontFamily: 'sans',
    fontSize: '1rem',
    fontSettings: "'wght' 80",
  }),
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

const menu = (scrollable: boolean) =>
  styles({
    bg: 'light.primary',
    listStyle: 'none',
    width: '100%',
    maxHeight: 400,
    overflowY: scrollable ? 'auto' : 'hidden',
    overflowX: 'hidden',
    paddingX: 2,
    ...scrollbar,
  })

const option = (highlighted: boolean) =>
  styles({
    ...typography.body,
    p: {
      ...typography.body,
    },
    paddingX: 3,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    cursor: 'pointer',
    border: 'divider-bottom',
    ':last-child': {
      border: 'none',
      marginBottom: 2,
    },
    bg: highlighted ? 'sidebar.hover' : 'light.primary',
    color: highlighted ? 'blue' : 'dark.primary',
    svg: {
      color: highlighted ? 'blue' : 'mid.primary',
    },
  })

const inputContainer = styles({
  position: 'relative',
})

const input = (open: boolean, standalone: boolean) =>
  styles({
    ...typography.title,
    color: 'dark.primary',
    height: 64,
    width: '100%',
    paddingX: 56,
    ':focus': {
      outline: 'none',
      boxShadow: 'none',
    },
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: !open || standalone ? 4 : 0,
    borderBottomLeftRadius: !open || standalone ? 4 : 0,
    border: !standalone && open ? 'divider-bottom' : 'none',
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
  color: 'mid.primary',
})

const label = styles({
  paddingLeft: 3,
  color: 'dark.secondary',
  fontSize: 0,
  marginY: 2,
})

const footer = styles({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
  paddingX: '6px',
  paddingY: '2px',
  fontSize: '11px',
  textTransform: 'uppercase',
  fontWeight: 400,
  fontVariationSettings: 'initial',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
})

const emptyContainer = styles({
  textAlign: 'center',
  marginY: 6,
  border: 'none',
})

const emptyTitle = styles({
  color: 'dark.primary',
  fontSize: 1,
})

const emptySubtitle = styles({
  color: 'dark.secondary',
  fontSize: 0,
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
  emptyContainer,
  emptyTitle,
  emptySubtitle,
}
