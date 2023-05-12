import { csx, dataAttr } from '@vtex/admin-ui-core'

export const tableHeadTheme = csx({
  display: 'contents',
})

export const tableHeadRowTheme = csx({
  display: 'contents',
})

export const columnCellTheme = csx({
  position: 'sticky',
  top: '$space-0',
  color: '$secondary',
  background: '$primary',
  overflowX: 'clip',
  zIndex: '$z-2',
  [dataAttr('vertical-scroll', 'true')]: {
    '> div': {
      boxShadow: '$overlay.center',
    },
  },
  [dataAttr('vertical-scroll', 'false')]: {
    '> div': {
      boxShadow: 'none',
    },
  },
})

export const sortableContainerTheme = csx({
  display: 'flex',
  alignItems: 'center',
  ':hover': {
    svg: {
      opacity: 1,
    },
  },
})

export const sortIndicatorTheme = csx({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '$space-1',
  minHeight: '0.75rem',
})

export const sortIndicatorUpTheme = csx({
  opacity: 0,
  [dataAttr('direction', 'asc')]: { opacity: 1 },
})
