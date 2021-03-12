import { StyleObject } from '@vtex/admin-core'

export default {
  kbd: {
    paddingX: 2,
    paddingY: 1,
    borderRadius: 'default',
    borderColor: 'mid.secondary',
    bg: 'light.secondary',
    borderBottomWidth: 3,
    borderTopWidth: '1',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  header: {
    top: 0,
    height: 'header',
    position: 'fixed',
    border: 'divider-bottom',
    color: 'dark.primary',
    bg: 'light.primary',
    width: '100%',
    maxWidth: '90rem',
    display: 'flex',
    alignContent: 'center',
    zIndex: 9999,
    padding: '0 56px',
    '& > *:not(:last-child)': {
      marginRight: 4,
    },
    "a:not([href^='#'])": {
      display: 'inline-flex',
      alignItems: 'center',
      height: 'calc(100% - 5px)',
      color: 'inherit',
      marginTop: 1,
      borderBottom: '2px solid transparent',
      textTransform: 'uppercase',
      fontSize: '0.875em',
      "&:not([href='/'])": {
        paddingX: 4,
        '&:hover': {
          color: 'blue',
          textDecoration: 'none',
        },
      },
    },
  },
  toc: {
    padding: 5,
    display: ['none', 'none', 'none', 'initial'],
    fontSize: '0.875em',
    nav: {
      listStyle: 'none',
      margin: 0,
      paddingLeft: 4,
      li: {
        display: 'flex',
        flexDirection: 'column',
      },
      ul: {
        paddingY: 1,
        listStyle: 'none',
        paddingLeft: 3,
      },
    },
  },
  tocLink: {
    color: 'dark.secondary',
    textDecoration: 'none',
    transition: 'all 150ms ease',
    position: 'relative',
    ':hover': {
      color: 'dark.primary',
    },
    "&[aria-current='page']": {
      color: 'dark.primary',
      fontSettings: 'bold',
    },
  },
  sidebar: {
    paddingBottom: 8,
    height: 'calc(100vh - 4.5rem)',
    overflowY: 'auto',
  },
  sidebarLink: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 'full',
    borderRadius: 'default',
    alignItems: 'center',
    height: 32,
    paddingX: 2,
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
    marginBottom: 2,
    ':hover:not(:focus)': {
      color: 'blue',
    },
    '&[aria-current="page"]': {
      bg: '#EAF0FD',
      color: 'blue',
    },
    ':focus': {
      color: 'blue',
      outline: 'none',
    },
  },
} as Record<string, StyleObject>
