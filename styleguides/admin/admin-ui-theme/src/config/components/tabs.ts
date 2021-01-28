// import { alpha } from '@vtex/admin-ui-system'

const listContainerStyles = {
  paddingX: 4,
  borderBottomColor: 'mid.tertiary',
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
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
  ':disabled': {
    color: 'mid.primary',
    bg: 'light.secondary',
  },
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
  'list-tab': {
    ...listContainerStyles,
    display: 'flex',
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
