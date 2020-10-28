import { SxStyleProp } from 'theme-ui'

const baseCell: SxStyleProp = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'secondary.base',
  bg: 'transparent',
  borderRadius: '100%',
  border: '2px transparent solid',
  width: ['1.8rem', '2rem', '2.75rem'],
  height: ['1.8rem', '2rem', '2.75rem'],
}

const weekdayCell: SxStyleProp = {
  ...baseCell,
  fontSize: 3,
  color: ['secondary.base', 'secondary.base', 'muted.1'],
}

const activeDayCell: SxStyleProp = {
  cursor: 'pointer',
  borderColor: 'bubblegum.base',
  borderStyle: 'solid',
  borderWidth: '2px',
  fontSize: 2,
}

const baseDayCell: SxStyleProp = {
  ...baseCell,
  fontSize: 2,
  transition: 'all 0.2s ease-in-out',
  ':hover': {
    ...activeDayCell,
  },
  ':focus': {
    ...activeDayCell,
    outline: 'none',
  },
  ':disabled': {
    cursor: 'not-allowed',
    border: 'none',
  },
  active: {
    ...baseCell,
    ...activeDayCell,
    outline: 'none',
  },
}

const monthCell: SxStyleProp = {
  ...baseDayCell,
}

const extraCell: SxStyleProp = {
  ...baseDayCell,
  color: 'muted.2',
}

const title: SxStyleProp = {
  fontSize: 3,
  textAlign: 'center',
  '&:first-letter': { textTransform: 'capitalize' },
}

const baseCalendar: SxStyleProp = {
  bg: 'primary.contrast',
  borderRadius: 3,
  px: 5,
  py: 7,
  maxWidth: '25rem',
  boxShadow: ['none', 'none', '0px 6px 10px rgba(61, 62, 64, 0.25)'],
}

const disabled: SxStyleProp = {
  opacity: 0.5,
}

const grid: SxStyleProp = {
  width: '100%',
  py: 4,
  rowGap: 5,
  gridTemplateColumns: 'repeat(7, 1fr)',
}

const calendar: SxStyleProp = {
  ...baseCalendar,
  disabled: {
    ...baseCalendar,
    ...disabled,
  },
  title,
  grid,
  weekdayCell,
  monthCell,
  extraCell,
}

export default calendar
