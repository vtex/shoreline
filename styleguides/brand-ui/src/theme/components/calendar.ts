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
  width: ['1.8rem', '2rem', '3rem'],
  height: ['1.8rem', '2rem', '3rem'],
  position: 'relative',
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
  color: 'secondary.base',
  fontSize: 2,
}

const baseDayCell: SxStyleProp = {
  ...baseCell,
  fontSize: 2,
  transition: 'all .3s ease-in-out',
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
  maxWidth: '30rem',
  boxShadow: ['none', 'none', '0px 6px 10px rgba(61, 62, 64, 0.25)'],
}

const disabled: SxStyleProp = {
  opacity: 0.5,
}

const grid: SxStyleProp = {
  width: '100%',
  py: 4,
  rowGap: 4,
  gridTemplateColumns: 'repeat(7, 1fr)',
  alignItems: 'center',
}

const baseEvent: SxStyleProp = {
  width: '50%',
  height: '6px',
}

const event: SxStyleProp = {
  leftEv: {
    ...baseEvent,
    left: 0,
    borderTopLeftRadius: '48px',
    borderBottomLeftRadius: '48px',
  },
  rightEv: {
    ...baseEvent,
    right: 0,
    borderTopRightRadius: '48px',
    borderBottomRightRadius: '48px',
  },
}

const eventContainer: SxStyleProp = {
  display: 'flex',
  px: [0, 0, '10px'],
  width: '100%',
  position: 'absolute',
  bottom: [-2, 3],
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
  event,
  eventContainer,
}

export default calendar
