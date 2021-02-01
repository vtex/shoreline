const listContainerStyles = {
  display: 'inline-block',
  paddingX: 4,
  width: 'full',
}

const tabStyles = {
  fontSettings: 'regular',
  border: 'none',
  borderRadius: 'default',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
  borderBottomStyle: 'solid',
  borderBottomColor: 'transparent',
  borderBottomWidth: 2,
  borderTopStyle: 'solid',
  borderTopColor: 'transparent',
  borderTopWidth: 2,
  height: 44,
  minWidth: 110,
  cursor: 'pointer',
  position: 'relative',
  ':focus:not([data-focus-visible-added])': {
    outline: 'none',
    boxShadow: 'none',
  },
  ':focus': {
    outline: 'none',
    boxShadow: 'focus',
  },
  paddingX: 6,
  textTransform: 'uppercase',
  backgroundColor: 'transparent',
  color: 'dark.secondary',
}

const tabContentStyles = {
  ':focus:not([data-focus-visible-added])': {
    outline: 'none',
    boxShadow: 'none',
  },
  ':focus': {
    outline: 'none',
    boxShadow: 'focus',
  },
}

export default {
  list: listContainerStyles,
  'list-fluid': {
    ...listContainerStyles,
    display: 'flex',
    justifyContent: 'space-evenly',
    '> button': { width: 'full' },
  },
  tab: {
    ...tabStyles,
    ':hover': {
      color: 'blue.hover',
    },
  },
  'tab-active': {
    ...tabStyles,
    borderBottomColor: 'blue',
    color: 'blue',
  },
  'tab-content': tabContentStyles,
}
