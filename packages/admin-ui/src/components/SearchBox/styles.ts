import type { StyleObject } from '@vtex/admin-ui-core'

function styles(csx: StyleObject): StyleObject {
  return csx
}

const typography = {
  title: styles({
    fontFamily: 'sans',
    fontSize: '1.2rem',
    fontSettings: 'regular',
  }),
  body: styles({
    fontFamily: 'sans',
    fontSize: '1rem',
    fontSettings: 'regular',
  }),
}

const scrollbar = styles({
  scrollbarWidth: 'thin',
  scrollbarColor: 'base',
  '::-webkit-scrollbar': {
    width: '8px',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'base',
    borderRadius: '6px',
    border: '2px solid',
    color: 'muted',
  },
})

const box = styles({
  bg: 'field.neutral',
  borderRadius: 4,
  border: '1px solid',
  borderColor: 'field.neutral',
  boxShadow: '0px 20px 40px rgba(0,0,0,.24)',
})

const menu = (scrollable: boolean) =>
  styles({
    bg: 'base',
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
    bg: highlighted ? 'listBoxItem.mainSelected' : 'listBoxItem.main',
    color: highlighted ? 'listBoxItem.mainSelected' : 'listBoxItem.main',
    svg: {
      color: highlighted ? 'listBoxItem.mainSelected' : 'listBoxItem.main',
    },
  })

const inputContainer = styles({
  position: 'relative',
})

const input = (open: boolean, standalone: boolean) =>
  styles({
    ...typography.title,
    bg: 'field.neutral',
    color: 'field.neutral',
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
  color: 'base',
  size: 28,
  position: 'absolute',
  top: '18px',
  left: 4,
})

const inputButton = styles({
  position: 'absolute',
  right: 4,
  top: 3,
  color: 'muted',
})

const label = styles({
  paddingLeft: 3,
  color: 'muted',
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
  color: 'muted',
})

const kbd = styles({
  bg: 'muted',
  color: 'muted',
  borderColor: 'muted',
  borderWidth: '1px',
  borderStyle: 'solid',
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
  color: 'base',
  fontSize: 1,
})

const emptySubtitle = styles({
  color: 'muted',
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
