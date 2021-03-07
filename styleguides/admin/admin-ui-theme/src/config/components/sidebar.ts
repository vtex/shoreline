const SCALES = {
  MAX_SIDEBAR_WIDTH: '16rem',
  COLLAPSIBLE_AREA_WIDTH: '12.5rem',
  FIXED_AREA_WIDTH: '3.5rem',
}

const borders = {
  borderRight: '1px solid',
  borderColor: 'mid.tertiary',
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
    ...borders,
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
    padding: '1.875rem 0.875rem',
    outline: 'none',
    overflow: 'overlay',
    backgroundColor: 'light.secondary',
    transform: 'unset !important',
    ...borders,
  },
  section: {
    width: 'calc(200px - 1.75rem)',
    paddingBottom: 8,
  },
  backdrop: {
    minWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
    maxWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
  },
  'collapse-button-container': {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
    height: 80,
    width: 40,
    marginLeft: 'auto',
    top: '0.875rem',
  },
  'collapse-button': {
    border: '1px solid',
    borderRadius: '100%',
    borderColor: 'mid.tertiary',
    height: 20,
    width: 20,
    transition: 0.3,
    backgroundColor: 'white',
    '> div > svg': {
      color: 'grey',
    },
    '&:hover': {
      backgroundColor: 'blue.hover',
      borderColor: 'blue.hover',
      '> div > svg': {
        color: 'white',
      },
    },
  },
}
