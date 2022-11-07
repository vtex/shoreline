import { style, styleVariants } from '@vtex/admin-ui-core'

export const baseline = style({
  display: 'flex',
  alignItems: 'center',
  text: '$body',
  minHeight: '2.75rem',
  bg: '$primary',
  borderBottom: '$neutral',
  padding: '$space-0',
})

export const variants = styleVariants({
  clickable: {
    true: {
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
    false: {},
  },
  fixed: {
    true: {
      position: 'sticky',

      '[role=columnheader]': {
        zIndex: 4,
      },

      '[role=cell]': {
        zIndex: 2,
      },

      ':first-child > div': {
        paddingLeft: '$space-3',
      },

      ':last-child > div': {
        paddingX: '$space-5',
      },
    },
    false: {},
  },
  lastFixed: {
    true: {
      borderRight: '$neutral',

      '[role=columnheader]': {
        zIndex: 3,
      },

      '[role=cell]': {
        overflowY: 'clip',
        zIndex: 1,
      },
    },
    false: {},
  },
  hasHorizontalScroll: {
    true: {
      '> div': {
        boxShadow: '$overlay.center',
        overflowY: 'clip',
      },
    },
    false: {
      '> div': {
        boxShadow: 'none',
      },
    },
  },
})

export const innerContainer = style({
  display: 'flex',
  alignItems: 'center',
  paddingX: '$space-5',
  width: '100%',
  height: '100%',
})
