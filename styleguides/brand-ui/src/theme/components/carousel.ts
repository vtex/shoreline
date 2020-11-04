import { SxStyleProp } from 'theme-ui'

const slidesContainer: SxStyleProp = {
  height: '100%',
  width: '100%',
}

const navigationContainerBase: SxStyleProp = {
  position: 'absolute',
  height: '100%',
  alignItems: 'center',
}

const navigationContainer: SxStyleProp = {
  previous: {
    ...navigationContainerBase,
    left: 0,
  },
  next: {
    ...navigationContainerBase,
    right: 0,
  },
}

const navigationButton: SxStyleProp = {
  height: 64,
  width: 64,
  cursor: 'pointer',
  border: 'none',
  borderRadius: '100%',
  backgroundColor: 'muted.4',
  color: 'secondary.base',
  boxShadow: '0px 3px 9px rgba(61, 62, 64, 0.25)',
  ':hover': {
    backgroundColor: 'muted.3',
  },
  '&:focus': {
    outline: 'none',
  },
}

const indicatorBar: SxStyleProp = {
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  marginX: 5,
  marginBottom: 48,
  position: 'absolute',
  button: {
    marginRight: 5,
  },
  'button:last-child': {
    marginRight: 0,
  },
}

const indicatorStyles: SxStyleProp = {
  height: 16,
  width: 16,
  minHeight: 16,
  minWidth: 16,
  padding: 0,
  border: 'none',
  borderRadius: '100%',
  backgroundColor: 'muted.4',
  cursor: 'pointer',
  opacity: 0.5,
  ':hover': {
    opacity: 1,
    backgroundColor: 'muted.3',
  },
  '&:focus': {
    outline: 'none',
  },
}

const indicator: SxStyleProp = {
  ...indicatorStyles,
  active: {
    ...indicatorStyles,
    opacity: 1,
  },
}

const nextButton: SxStyleProp = {
  ...navigationButton,
  marginRight: 5,
}

const previousButton: SxStyleProp = {
  ...navigationButton,
  marginLeft: 5,
}

const slideBase: SxStyleProp = {
  height: 600,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  transition: '0.5s linear',
}

const slide: SxStyleProp = {
  hidden: {
    ...slideBase,
    position: 'absolute',
    opacity: 0,
    visibility: 'hidden',
  },
  visible: {
    ...slideBase,
    position: 'static',
    opacity: 1,
    visibility: 'visible',
  },
}

export default {
  slidesContainer,
  navigationContainer,
  nextButton,
  previousButton,
  indicatorBar,
  indicator,
  slide,
}
