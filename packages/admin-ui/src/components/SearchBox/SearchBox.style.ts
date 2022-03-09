import type { StyleObject } from '@vtex/admin-ui-core'

function css(csx: StyleObject): StyleObject {
  return csx
}

const scrollbar = css({
  scrollbarWidth: 'thin',
  scrollbarColor: '$primary',
  '::-webkit-scrollbar': {
    width: '8px',
  },
  '::-webkit-scrollbar-thumb': {
    bg: '$primary',
    borderRadius: '6px',
    border: '2px solid',
    color: '$secondary',
  },
})

const box = css({
  bg: '$form.neutral',
  borderRadius: 4,
  border: '$neutral',
  boxShadow: '0px 20px 40px rgba(0,0,0,.24)',
})

const menu = (scrollable: boolean) =>
  css({
    bg: '$primary',
    listStyle: 'none',
    width: '100%',
    maxHeight: 400,
    overflowY: scrollable ? 'auto' : 'hidden',
    overflowX: 'hidden',
    paddingX: 2,
    ...scrollbar,
  })

const option = (highlighted: boolean) =>
  css({
    text: '$body',
    p: {
      text: '$body',
    },
    paddingX: 3,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    cursor: 'pointer',
    borderBottom: '$neutral',
    ':last-child': {
      border: 'none',
      marginBottom: 2,
    },
    bg: highlighted
      ? '$action.neutral.tertiaryHover'
      : '$action.neutral.tertiary',
    color: highlighted
      ? '$action.neutral.tertiaryHover'
      : '$action.neutral.tertiary',
    svg: highlighted
      ? '$action.neutral.tertiaryHover'
      : '$action.neutral.tertiary',
    ':active': {
      color: '$action.neutral.tertiaryPressed',
      background: '$action.neutral.tertiaryPressed',
    },
  })

const inputContainer = css({
  position: 'relative',
})

const input = (open: boolean, standalone: boolean) =>
  css({
    text: '$body',
    bg: '$form.neutral',
    color: '$form.neutral',
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
    borderBottom: !standalone && open ? '$neutral' : 'none',
  })

const inputIcon = css({
  color: '$primary',
  size: 28,
  position: 'absolute',
  top: '18px',
  left: 4,
})

const inputButton = css({
  position: 'absolute',
  right: 4,
  top: 3,
  color: '$secondary',
})

const label = css({
  paddingLeft: 3,
  color: '$secondary',
  text: '$body',
  marginY: 2,
})

const footer = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  text: '$body',
  height: 40,
  textAlign: 'center',
  border: 'divider-top',
  bg: '$primary',
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  'div + div': {
    marginLeft: 5,
  },
  color: '$secondary',
})

// TODO create kbd component
const kbd = css({
  bg: '$secondary',
  color: '$secondary',
  border: '$neutral',
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

const emptyContainer = css({
  textAlign: 'center',
  marginY: 6,
  border: 'none',
})

const emptyTitle = css({
  color: 'base',
  text: '$title1',
})

const emptySubtitle = css({
  color: '$secondary',
  text: '$title2',
})

export {
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
