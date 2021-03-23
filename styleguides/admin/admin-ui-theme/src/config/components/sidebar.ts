const SCALES = {
  MAX_SIDEBAR_WIDTH: '16rem',
  COLLAPSIBLE_AREA_WIDTH: '12.5rem',
  FIXED_AREA_WIDTH: '3.5rem',
}

export default {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: SCALES.MAX_SIDEBAR_WIDTH,
    minWidth: SCALES.FIXED_AREA_WIDTH,
    outline: 'none',
    borderRight: '1px solid',
    borderColor: 'mid.tertiary',
  },
  root: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingY: '0.625rem',
    maxWidth: '16rem',
    height: '100%',
    width: '100%',
    overflow: 'initial',
  },
  item: {
    position: 'absolute',
    top: 0,
    maxWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
    height: '100%',
    width: '12.5rem',
    padding: '1.5rem 0.5rem',
    outline: 'none',
    overflow: 'auto',
    backgroundColor: 'transparent',
    transform: 'unset !important',
  },
}
