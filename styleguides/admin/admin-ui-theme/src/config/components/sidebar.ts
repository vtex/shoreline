const SCALES = {
  COLLAPSIBLE_AREA_WIDTH: '12.5rem',
  FIXED_AREA_WIDTH: '3.5rem',
}

export default {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingY: '0.625rem',
  justifyContent: 'space-between',
  height: 'calc(100% - 1.25rem)',
  maxWidth: SCALES.FIXED_AREA_WIDTH,
  minWidth: SCALES.FIXED_AREA_WIDTH,
  borderRight: '1px solid #E0E2E7',
  outline: 'none',
  overflowY: 'auto',
  item: {
    transform: 'unset !important',
    outline: 'none',
    backgroundColor: '#F8F9FA',
    height: '100%',
    padding: '1.875rem 0.875rem',
    borderRight: '1px solid #E0E2E7',
    overflowY: 'auto',
    maxWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
  },
  backdrop: {
    minWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
    maxWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
  },
}
