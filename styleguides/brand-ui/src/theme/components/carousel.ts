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

const navigationButtonBase: SxStyleProp = {
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

const navigationButton = {
  regular: {
    ...navigationButtonBase,
    height: 64,
    width: 64,
  },
  small: {
    ...navigationButtonBase,
    height: 40,
    width: 40,
  },
}

const indicatorBar: SxStyleProp = {
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  marginX: 5,
  position: 'absolute',
  button: {
    marginRight: 5,
  },
  'button:last-child': {
    marginRight: 0,
  },
  marginBottom: 6,
}

const indicatorBase: SxStyleProp = {
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

const indicator = {
  ...indicatorBase,
  active: {
    ...indicatorBase,
    opacity: 1,
  },
}

const nextButton = {
  small: {
    ...navigationButton.small,
    marginRight: 4,
  },
  regular: {
    ...navigationButton.regular,
    marginRight: 4,
  },
}

const previousButton = {
  small: {
    ...navigationButton.small,
    marginLeft: 4,
  },
  regular: {
    ...navigationButton.regular,
    marginLeft: 4,
  },
}

const slideBase: SxStyleProp = {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  transition: '0.5s linear',
}

const slideAnimations: SxStyleProp = {
  '@keyframes slideInLTR': {
    '0%': {
      transform: 'translateX(100%)',
    },
    '100%': {
      transform: 'translateX(0)',
    },
  },
  '@keyframes slideOutLTR': {
    '0%': {
      transform: 'translateX(0)',
      visibility: 'visible',
    },
    '100%': {
      transform: 'translateX(-100%)',
    },
  },
  '@keyframes slideInRTL': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '100%': {
      transform: 'translateX(0)',
    },
  },
  '@keyframes slideOutRTL': {
    '0%': {
      transform: 'translateX(0)',
      visibility: 'visible',
    },
    '100%': {
      transform: 'translateX(100%)',
    },
  },
}

const slideDefault: SxStyleProp = {
  ...slideAnimations,
  ltr: {
    current: {
      ...slideBase,
      animation: 'slideInLTR 1s forwards',
      position: 'static',
      visibility: 'visible',
    },
    swap: {
      ...slideBase,
      animation: 'slideOutLTR 1s forwards',
      position: 'absolute',
      visibility: 'hidden',
    },
    default: {
      ...slideBase,
      position: 'absolute',
      visibility: 'hidden',
    },
  },
  rtl: {
    current: {
      ...slideBase,
      animation: 'slideInRTL 1s forwards',
      position: 'static',
      visibility: 'visible',
    },
    swap: {
      ...slideBase,
      animation: 'slideOutRTL 1s forwards',
      position: 'absolute',
      visibility: 'hidden',
    },
    default: {
      ...slideBase,
      position: 'absolute',
      visibility: 'hidden',
    },
  },
}

const slideCrossfade: SxStyleProp = {
  default: {
    ...slideBase,
    position: 'absolute',
    opacity: 0,
    visibility: 'hidden',
  },
  current: {
    ...slideBase,
    position: 'static',
    opacity: 1,
    visibility: 'visible',
  },
}

export default {
  position: 'relative',
  overflow: 'hidden',
  slidesContainer,
  navigationContainer,
  nextButton,
  previousButton,
  indicatorBar,
  indicator,
  slide: {
    crossfade: slideCrossfade,
    ...slideDefault,
  },
}
