import { SxStyleProp } from 'theme-ui'

const base: SxStyleProp = {
  width: '100%',
  cursor: 'pointer',
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
    display: ['none', 'block', 'block'],
  },
  content: {
    alignItems: 'center',
    mr: 4,
  },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 1140,
    px: 4,
    py: 3,
    mx: 'auto',
    minHeight: 56,
    fontSize: [0, 2],
  },
  actionIcon: {
    display: ['block', 'block', 'none'],
    px: 4,
    height: '100%',
  },
}

export default helloBar
