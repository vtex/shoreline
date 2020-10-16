import merge from 'deepmerge'

const styles = {
  reset: {
    borderCollapse: 'collapse',
    'td, th': {
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: 'muted.3',
    },
  },
  lead: {
    height: 48,
    display: 'flex',
    alignItems: 'center',
    verticalAlign: 'middle',
    paddingX: 2,
    color: 'muted.0',
    fontWeight: 'normal',
    variant: 'text.body',
  },
}

export default {
  skeleton: {
    height: 24,
  },
  image: {
    regular: {
      width: 56,
      minWidth: 56,
      height: 56,
      minHeight: 56,
      borderRadius: 4,
    },
    compact: {
      width: 32,
      minWidth: 32,
      height: 32,
      minHeight: 32,
      borderRadius: 4,
    },
    variable: {
      minWidth: 32,
      minHeight: 32,
      borderRadius: 4,
    },
  },
  'image-preview': {
    small: {
      width: 56,
      minWidth: 56,
      height: 56,
      minHeight: 56,
      borderRadius: 4,
      boxShadow: 'menu',
    },
    regular: {
      width: 156,
      minWidth: 156,
      height: 156,
      minHeight: 156,
      borderRadius: 4,
      boxShadow: 'menu',
    },
    large: {
      width: 256,
      minWidth: 256,
      height: 256,
      minHeight: 256,
      borderRadius: 4,
      boxShadow: 'menu',
    },
  },
  regular: {
    ...styles,
    cell: {
      display: 'flex',
      alignItems: 'center',
      verticalAlign: 'middle',
      height: 80,
      paddingX: 2,
      variant: 'text.body',
    },
  },
  compact: {
    ...styles,
    cell: {
      display: 'flex',
      alignItems: 'center',
      verticalAlign: 'middle',
      height: 48,
      paddingX: 2,
      variant: 'text.body',
    },
  },
  variable: merge(styles, {
    tbody: {
      verticalAlign: 'top',
    },
    cell: {
      display: 'flex',
      alignItems: 'flex-start',
      minHeight: 48,
      paddingY: 4,
      paddingX: 2,
      variant: 'text.body',
    },
  }),
}
