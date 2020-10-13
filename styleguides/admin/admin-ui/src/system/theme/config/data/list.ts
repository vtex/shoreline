const itemStyles = {
  display: 'flex',
  width: 'full',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderBottomColor: 'muted.3',
  justifyContent: 'flex-start',
}

export default {
  compact: {
    ...itemStyles,
    height: 48,
    'svg, img': {
      minHeight: 32,
      maxHeight: 32,
      minWidth: 32,
      maxWidth: 32,
    },
  },
  regular: {
    ...itemStyles,
    height: 80,
    'svg, img': {
      minHeight: 48,
      maxHeight: 48,
      minWidth: 48,
      maxWidth: 48,
    },
  },
  comfortable: {
    ...itemStyles,
    height: 128,
    'svg, img': {
      minHeight: 80,
      maxHeight: 80,
      minWidth: 80,
      maxWidth: 80,
    },
  },
}
