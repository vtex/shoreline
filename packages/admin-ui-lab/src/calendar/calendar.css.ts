import { csx } from '@vtex/admin-ui'

export const calendarTheme = csx({})

export const calendarHeaderTheme = csx({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '$space-3',
})

export const calendarCellTheme = csx({
  size: '2.25rem',
  button: {
    size: '100%',
    borderRadius: '100%',
    bg: 'transparent',
    cursor: 'pointer',
  },
  'button[data-is-selected="true"]': {
    bg: '$action.main.primary',
    color: '$action.main.primary',
  },
  'button:focus-visible': {
    outline: 'none',
    boxShadow: '$ring.neutral',
  },
})
