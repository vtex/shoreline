const slidesContainerBase = {
  zIndex: 0,
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
  zIndex: 1,
  minWidth: 'fit-content',
  paddingTop: 2,
  paddingBottom: 2,
}

const buttonDirection = {
  previous: { left: 0 },
  next: { right: 0 },
}

const overlaySlides = {
  default: { position: 'relative' },
  overlay: { position: 'absolute' },
}

const buttonAlign = {
  top: { alignSelf: 'baseline' },
  center: { alignSelf: 'center' },
}

const navigationContainer = {
  ...Object.keys(buttonDirection).reduce(
    (acc, d) => ({
      ...acc,
      ...Object.keys(overlaySlides).reduce(
        (bcc, o) => ({
          ...bcc,
          ...Object.keys(buttonAlign).reduce(
            (ccc, b) => ({
              ...ccc,
              [`${d}-${o}-${b}`]: {
                ...navigationContainerBase,
                ...(buttonDirection as any)[d],
                ...(overlaySlides as any)[o],
                ...(buttonAlign as any)[b],
              },
            }),
            []
          ),
        }),
        {}
      ),
    }),
    {}
  ),
}

const navigationButtonBase = {
  cursor: 'pointer',
  border: 'none',
  borderRadius: '100%',
  backgroundColor: 'muted.5',
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

const indicatorBarBase = {
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  marginX: 5,
  button: {
    marginRight: 5,
  },
  'button:last-child': {
    marginRight: 0,
  },
  marginBottom: 6,
}

const indicatorBar = {
  default: { ...indicatorBarBase, position: 'relative' },
  overlay: { ...indicatorBarBase, position: 'absolute' },
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

const next = {
  small: {
    ...navigationButton.small,
    marginRight: 4,
  },
  regular: {
    ...navigationButton.regular,
    marginRight: 4,
  },
}

const previous = {
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
  flexDirection: 'column',
  width: 'fit-content',
  slidesContainer,
  slide,
  navigationContainer,
  next,
  previous,
  indicatorBar,
  indicator,
}
