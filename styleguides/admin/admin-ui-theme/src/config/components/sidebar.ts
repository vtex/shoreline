const SCALES = {
  MAX_SIDEBAR_WIDTH: '16rem',
  COLLAPSIBLE_AREA_WIDTH: '12.5rem',
  FIXED_AREA_WIDTH: '3.5rem',
}

export default {
  overflowX: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingY: '0.625rem',
  height: 'calc(100% - 1.25rem)',
  width: '100%',
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: SCALES.MAX_SIDEBAR_WIDTH,
    minWidth: SCALES.FIXED_AREA_WIDTH,
    borderRight: '1px solid #E0E2E7',
    outline: 'none',
  },
  item: {
    top: 0,
    transform: 'unset !important',
    outline: 'none',
    backgroundColor: '#F8F9FA',
    height: '100%',
    padding: '1.875rem 0.875rem',
    borderRight: '1px solid #E0E2E7',
    overflow: 'overlay',
    maxWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
  },
  backdrop: {
    minWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
    maxWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
  },
}
