import { SxStyleProp } from 'theme-ui'

import space from '../space'

export default {
  display: 'flex',
  flexDirection: 'column',
  bg: 'background',
  marginTop: 4,
  paddingX: 7,
  paddingTop: 7,
  paddingBottom: 5,
  minWidth: 18,
  borderRadius: 3,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'muted.2',
  boxShadow: 'menu',
  hr: {
    marginY: 5,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderColor: 'muted.2',
    width: `calc(100% -${space[7]})`,
    marginX: `-${space[7]}`,
    outline: 'none',
  },
  '> button': {
    marginY: 2,
    paddingY: 4,
    paddingX: 3,
    color: 'text',
    fontSize: 1,
    border: 'none',
    textTransform: 'initial',
    ':focus': {
      bg: 'primary.washed.0',
      outline: 'none',
      boxShadow: 'none',
    },
    ':hover': {
      color: 'text',
    },
    width: 'full',
    div: {
      justifyContent: 'flex-start',
    },
    svg: {
      marginLeft: 0,
      marginRight: 5,
    },
  },
} as SxStyleProp
