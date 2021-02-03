import { SxStyleProp } from 'theme-ui'

const baseCell: SxStyleProp = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  placeItems: 'center',
  color: 'secondary.base',
  bg: 'transparent',
  borderRadius: '100%',
  border: '2px transparent solid',
  width: ['35px', '44px'],
  height: ['35px', '44px'],
  position: 'relative',
  fontSize: [2, 3],
}

const weekdayCell: SxStyleProp = {
  ...baseCell,
  color: 'muted.1',
}

const activeDayCell: SxStyleProp = {
  cursor: 'pointer',
  backgroundColor: 'focus',
  color: 'secondary.base',
}

const hoverDayCell: SxStyleProp = {
  cursor: 'pointer',
  backgroundColor: 'muted.3',
}

const baseDayCell: SxStyleProp = {
  ...baseCell,
  transition: 'all .3s ease-in-out',
  ':hover': {
    ...hoverDayCell,
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
  current: {
    ...baseDayCell,
    cursor: 'pointer',
    borderColor: 'bubblegum.base',
    borderStyle: 'solid',
    borderWidth: '2px',
    color: 'primary.base',
    fontWeight: 500,
  },
}

const extraCell: SxStyleProp = {
  ...baseDayCell,
  color: 'muted.2',
}

const title: SxStyleProp = {
  '&:first-letter': { textTransform: 'capitalize' },
  color: 'secondary.base',
  center: {
    '&:first-letter': { textTransform: 'capitalize' },
    color: 'secondary.base',
    width: '100%',
  },
}

const header: SxStyleProp = {
  fontSize: 3,
  textAlign: 'center',
  marginX: 3,
  justifyContent: 'space-between',
}

const grid: SxStyleProp = {
  width: '100%',
  py: 4,
  columnGap: 0,
  rowGap: ['10px', 0],
  gridTemplateColumns: 'repeat(7, 1fr)',
  alignItems: 'center',
}

const baseEvent: SxStyleProp = {
  width: '11px',
  height: '4px',
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
  position: 'absolute',
  bottom: [0, 2],
}

const baseCalendar: SxStyleProp = {
  bg: 'primary.contrast',
  borderRadius: 3,
  px: 4,
  py: 48,
  maxWidth: '22rem',
  boxShadow: ['none', 'none', '0px 6px 10px rgba(61, 62, 64, 0.25)'],
}

const disabled: SxStyleProp = {
  opacity: 0.5,
}

const calendar: SxStyleProp = {
  ...baseCalendar,
  disabled: {
    ...baseCalendar,
    ...disabled,
  },
  header,
  title,
  grid,
  weekdayCell,
  monthCell,
  extraCell,
  event,
  eventContainer,
}

export default calendar
