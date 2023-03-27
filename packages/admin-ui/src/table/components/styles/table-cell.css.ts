import { csx, dataAttr } from '@vtex/admin-ui-core'

export const tableCellTheme = csx({
  display: 'flex',
  alignItems: 'center',
  text: '$body',
  minHeight: '2.75rem',
  bg: '$primary',
  borderBottom: '$neutral',
  padding: '$space-0',

  [dataAttr('clickable', 'true')]: {
    cursor: 'pointer',
    userSelect: 'none',
    ':focus:not([data-focus-visible-added])': {
      outline: 'none',
      boxShadow: 'none',
    },
    ':focus': {
      outlineColor: 'focus',
    },
  },
  [dataAttr('fixed', 'true')]: {
    position: 'sticky',

    '[role=columnheader]': {
      zIndex: '$z-4',
    },

    '[role=cell]': {
      zIndex: '$z-2',
    },

    ':first-child > div': {
      paddingLeft: '$space-3',
    },

    ':last-child > div': {
      paddingX: '$space-5',
    },
  },
  [dataAttr('last-fixed', 'true')]: {
    borderRight: '$neutral',

    '[role=columnheader]': {
      zIndex: '$z-3',
    },

    '[role=cell]': {
      overflowY: 'clip',
      zIndex: '$z-1',
    },
  },
  [dataAttr('horizontal-scroll', 'true')]: {
    '> div': {
      boxShadow: '$overlay.center',
      overflowY: 'clip',
    },
  },
  [dataAttr('horizontal-scroll', 'false')]: {
    '> div': {
      boxShadow: 'none',
    },
  },
})

export const innerContainerTheme = csx({
  display: 'flex',
  alignItems: 'center',
  paddingX: '$space-5',
  width: '100%',
  height: '100%',
})
