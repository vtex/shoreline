import { style, styleVariants } from '@vtex/admin-ui-core'

export const baseline = style({
  display: 'flex',
  alignItems: 'center',
  wordBreak: 'break-word',
  text: '$body',
  minHeight: '2.75rem',
  bg: '$primary',
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
      zIndex: 2,

      ':first-child > div': {
        paddingLeft: '$l',
      },

      ':last-child > div': {
        paddingX: '$xl',
      },
    },
    false: {
      paddingX: '$xl',

      ':first-child': {
        paddingLeft: '$l',
      },

      ':last-child': {
        paddingRight: '$l',
      },
    },
  },
  lastFixed: {
    true: {
      borderRight: '$neutral',
      zIndex: 1,
    },
  },
  false: {},
})

export const fixedInnerContainer = style({
  display: 'flex',
  alignItems: 'center',
  paddingX: '$xl',
  width: '100%',
  height: '100%',
})
