import { mergeSx } from '@vtex-components/theme'
import { SxStyleProp } from 'theme-ui'

const styles: SxStyleProp = {
  borderCollapse: 'collapse',
  'th, td': {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: 'muted.3',
    paddingX: 2,
    variant: 'text.body',
  },
  th: {
    color: 'muted.1',
    fontWeight: 'normal',
  },
  'thead > tr': {
    height: 48,
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
    'tbody > tr': {
      height: 80,
    },
  },
  compact: {
    ...styles,
    'tbody > tr': {
      height: 48,
    },
  },
  variable: mergeSx<SxStyleProp>(styles, {
    tbody: {
      verticalAlign: 'top',
    },
    td: {
      minHeight: 48,
      paddingY: 2,
    },
  }),
} as Record<string, SxStyleProp>
