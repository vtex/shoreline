import { SxStyleProp } from 'theme-ui'

const base: SxStyleProp = {
  width: '100%',
  height: 56,
  alignItems: 'center',
  justifyContent: 'space-between',
  px: [4, 8, 11],
}

const helloBar: SxStyleProp = {
  primary: {
    ...base,
    backgroundColor: 'primary.washed',
    color: 'text',
  },
  secondary: {
    ...base,
    backgroundColor: 'secondary.base',
    color: 'muted.5',
  },
  tertiary: {
    ...base,
    backgroundColor: 'muted.5',
    color: 'text',
  },
  icon: {
    mr: 4,
  },
}

export default helloBar
