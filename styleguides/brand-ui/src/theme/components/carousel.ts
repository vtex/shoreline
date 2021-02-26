const slidesContainerBase = {
  height: '100%',
  width: '100%',
}

const slidesContainer = {
  ...slidesContainerBase,
  transition: '0.5s linear',
  crossfade: {
    '@keyframes crossfade': {
      '0%': {
        opacity: 1,
      },
      '50%': {
        opacity: 0.75,
      },
      '100%': {
        opacity: 1,
      },
    },
    animated: {
      ...slidesContainerBase,
      transition: 'none',
      animation: 'crossfade .5s forwards',
    },
    default: {
      ...slidesContainerBase,
      transition: 'none',
    },
  },
}

const slide = {
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
}

const navigationContainerBase = {
  position: 'absolute',
  paddingTop: 2,
  paddingBottom: 2,
}

const navigationContainer = {
  previous: {
    ...navigationContainerBase,
    left: 0,
  },
  next: {
    ...navigationContainerBase,
    right: 0,
  },
}

const navigationButtonBase = {
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

const indicatorBar = {
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

const indicatorBase = {
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

export default {
  position: 'relative',
  overflow: 'hidden',
  slidesContainer,
  slide,
  navigationContainer,
  nextButton,
  previousButton,
  indicatorBar,
  indicator,
}
